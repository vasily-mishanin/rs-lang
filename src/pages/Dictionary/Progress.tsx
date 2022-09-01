import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { getUserStatistic } from '@/model/api-statistic';
import { GameStatsProgressWord } from '@/model/app-types';
import { RootState } from '@/store/store';

const Progress = (): JSX.Element => {

  const [words, setWords] = useState<GameStatsProgressWord[]>([]);

  const authState = useSelector((state: RootState) => state.authentication);

  const loadData = async () =>{
    const currentStatistic = await getUserStatistic(authState.userId, authState.token);
    if (currentStatistic) setWords(Object.values(currentStatistic?.optional?.gamesWordsProgress));
  };

  useEffect(() => {
    loadData().catch(()=>{});
  }, [authState.userId, authState.token]);

  return (<section className='difficult-words w-full flex flex-col items-center'>
    <h1>Words encountered in games</h1>
    {words.map((el, i) => (
      <div className="flex justify-between w-6/12"
        key={i}
      >
        <div className='w-full'>{el.word}</div>
        <div className='w-2/12'>-{el.failed}</div>
        <div className='w-2/12'>+{el.guessed}</div>
        <div className='w-2/12'>++{el.guessStreak}</div>
        <div className='w-2/12'>{el.lastAnswerWasCorrect? 'OK' : 'NO'}</div>
      </div>

    ))}
  </section>);
};
export default Progress;
