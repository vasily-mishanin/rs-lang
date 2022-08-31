import { XCircleIcon, BadgeCheckIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { getUserStatistic } from '@/model/api-statistic';
import { GameStatsProgressWord, IUserStatistic } from '@/model/app-types';
import { RootState } from '@/store/store';

const Progress = (): JSX.Element => {

  const [words, setWords] = useState<GameStatsProgressWord[]>([]);
  const [stats, setStats] = useState<IUserStatistic>();

  const authState = useSelector((state: RootState) => state.authentication);

  const loadData = async () =>{
    const currentStatistic = await getUserStatistic(authState.userId, authState.token);
    if (currentStatistic) setWords(Object.values(currentStatistic?.optional?.gamesWordsProgress));
    if (currentStatistic) setStats(currentStatistic);

  };

  useEffect(() => {
    loadData().catch(()=>{});
  }, [authState.userId, authState.token]);

  return (<section className='difficult-words w-full flex flex-col items-center'>
    <h3>Game stats: </h3>
    <p>Games played total:
      <span>sprint : <b> {stats?.optional.gamesStatistic.gamesTotalCount.sprint} </b></span>
      <span>audio : <b> {stats?.optional.gamesStatistic.gamesTotalCount.audio} </b></span>
    </p>

    <h3>Games per day: </h3>
    {stats && (
      Object.keys(stats.optional.gamesStatistic.gamesPerDay).map((el, i) => (
        <div className="flex justify-between w-6/12"
          key={i}
        >
          <p>Date: {el}</p>
          <p>audio: {stats.optional.gamesStatistic.gamesPerDay[el].audio}</p>
          <p>sprint: {stats.optional.gamesStatistic.gamesPerDay[el].sprint}</p>
        </div>

      ))
    )}

    <h3>Words encountered in games</h3>
    {words.map((el, i) => (
      <div className="flex justify-between w-6/12"
        key={i}
      >
        <div className='w-full'>{el.word}</div>
        <div className='w-2/12 flex'>
          <XCircleIcon className='h-4 w-4 text-red-600' /> : {el.failed}</div>
        <div className='w-2/12 flex'>
          <BadgeCheckIcon className='h-4 w-4 text-green-600' /> : {el.guessed}</div>
        <div className='w-2/12 flex'>
         streak: <b>{el.guessStreak}</b></div>
        <div className='w-2/12 flex'>
          last: {el.lastAnswerWasCorrect
            ? <BadgeCheckIcon className='h-4 w-4 text-green-600' />
            : <XCircleIcon className='h-4 w-4 text-red-600' />}
        </div>
      </div>

    ))}
  </section>);
};
export default Progress;
