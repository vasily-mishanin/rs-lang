import './Statistics.pcss';

import { useSelector } from 'react-redux';

import { useEffect, useState } from 'react';

import { TableCard } from './TableCard/TableCard';

import { getUserStatistic } from '@/model/api-statistic';
import { getUserWordsCount } from '@/model/api-userWords';
import { GameResStatsItem, GameStatsProgressWord, GameStatsTotal, IUserStatistic } from '@/model/app-types';
import { RootState } from '@/store/store';

const getWinPercent = (score: GameResStatsItem | undefined) => {

  if (score) {
    const total = score.fail + score.success;
    return total ? (score.success / total * 100).toFixed(1) : '-';
  }

  return '-';
};

const getFullWinPercent  = (stats: GameStatsTotal | undefined) =>{
  if (stats) {
    const audio = getWinPercent(stats.audio);
    const sprint = getWinPercent(stats.sprint);

    const total = ((audio !== '-')? +audio : 0) + ((sprint !== '-')? +sprint : 0) / 2;
    return total.toFixed(1);
  }

  return '-';

};

const Statistics = (): JSX.Element => {
  const [learnedCount, setLC] = useState<number>(0);
  const [hardCount, setHC] = useState<number>(0);
  // const [newCount, setNC] = useState<number>(0);

  const [words, setWords] = useState<GameStatsProgressWord[]>([]);
  const [stats, setStats] = useState<IUserStatistic>();

  const authState = useSelector((state: RootState) => state.authentication);

  useEffect(() => {
    const loadData = async () => {
      const lc = await getUserWordsCount(authState.userId, authState.token, 'learned');
      if (lc) setLC(lc);
      const hc = await getUserWordsCount(authState.userId, authState.token, 'hard');
      if (hc) setHC(hc);
      // const nc =  await getUserWordsCount(authState.userId, authState.token, 'new');
      // if (nc) setNC(nc);

      const currentStatistic = await getUserStatistic(authState.userId, authState.token);
      if (currentStatistic) setWords(Object.values(currentStatistic?.optional?.gamesWordsProgress));
      if (currentStatistic) setStats(currentStatistic);

    };

    loadData().catch(() => { });
  }, [authState.userId, authState.token]);

  const currDate = new Date().toLocaleDateString('en-US');

  return (
    <section className="stats">
      <div className="stats_container">

        <TableCard
          heading='Общая статистика'
          subheading='За все время'
          items={[
            { title: 'Изученных слов', content: `${(learnedCount || '-')}` },
            { title: 'Слов, помеченных как сложные', content: `${(hardCount || '-')}` },
            { title: 'Процент верных ответов',
              content: `${getFullWinPercent(stats?.optional.gamesStatistic.resultsTotal) || '-'}`,
            },
          ]}
        />

        <TableCard
          heading='Статистика за сегодня'
          items={[
            {
              title: 'Встречено новых слов',
              content: `${(stats?.optional.wordsPerDay[currDate]?.new.length) || '-'}`,
            },
            {
              title: 'Изучено слов',
              content: `${(stats?.optional.wordsPerDay[currDate]?.learned.length) || '-'}`,
            },

          ]}
        />

        <TableCard
          heading='Мини игры'
          subheading='Статистика за все время'
          items={[
            {
              title: 'Сыграно игр',
              content: [
                {
                  title: 'Спринт',
                  content: `${stats?.optional.gamesStatistic.gamesTotalCount.sprint || '-'}`,
                },
                {
                  title: 'Аудиовызов',
                  content: `${stats?.optional.gamesStatistic.gamesTotalCount.audio || '-'}`,
                },
              ],
            },
            {
              title: 'Процент верных ответов',
              content: [
                { title: 'Спринт',
                  content: getWinPercent(
                    stats?.optional.gamesStatistic.resultsTotal.sprint,
                  ) },
                { title: 'Аудиовызов',
                  content: getWinPercent(
                    stats?.optional.gamesStatistic.resultsTotal.audio,
                  ) },
              ],
            },
            {
              title: 'Самая длинная серия правильных ответов',
              content: `${stats?.optional.gamesStatistic.bestStreak || '-'}`,
            },
          ]}
        />

        <TableCard
          heading='Мини игры'
          subheading='Статистика за сегодня'
          items={[
            {
              title: 'Сыграно игр',
              content: [
                {
                  title: 'Спринт',
                  content: `${stats?.optional.gamesStatistic.gamesPerDay[currDate]?.sprint || '-'}`,
                },
                {
                  title: 'Аудиовызов',
                  content: `${stats?.optional.gamesStatistic.gamesPerDay[currDate]?.audio || '-'}`,
                },
              ],
            },
            {
              title: 'Процент верных ответов',
              content: [
                {
                  title: 'Спринт',
                  content: getWinPercent(
                    stats?.optional.gamesStatistic.resultsPerDay[currDate]?.sprint,
                  ),
                },
                {
                  title: 'Аудиовызов',
                  content: getWinPercent(
                    stats?.optional.gamesStatistic.resultsPerDay[currDate]?.audio,
                  ),
                },
              ],
            },
          ]}
        />

      </div>
    </section>
  );
};
export default Statistics;
