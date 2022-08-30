import { getUserStatistic, updateUserStatistic } from '@/model/api-statistic';
import { IUserStatistic } from '@/model/app-types';
import { ISprintWord } from '@/model/games-types';

export interface IGameStats {
  total: number;

}
export function saveGameResultStats (
  gameName: string,
  userId: string,
  userToken: string,
  correctAnswers: ISprintWord[],
  wrongAnswers: ISprintWord[],
) {

  const currentStatistic = getUserStatistic(userId, userToken);
  console.log(currentStatistic);

  // const stats: IUserStatistic = { learnedWords: 0, optional: {} };

  // updateUserStatistic();
};
