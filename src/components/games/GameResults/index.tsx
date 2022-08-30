import { getUserStatistic, updateUserStatistic } from '@/model/api-statistic';
import { getUserAggregatedWords } from '@/model/api-userWords';
import { GameStatsProgressWord, IUserStatistic, Word } from '@/model/app-types';
import { ISprintWord } from '@/model/games-types';

export interface IGameStats {
  total: number;

}
export async function saveGameResultStats (
  gameName: string,
  userId: string,
  userToken: string,
  correctAnswers: ISprintWord[],
  wrongAnswers: ISprintWord[],
) {

  const learnedWords = await getUserAggregatedWords(userId, userToken, { filter: '{"$and":[{"userWord.difficulty":"learned"}]}' });
  const hardWords = await getUserAggregatedWords(userId, userToken, { filter: '{"$and":[{"userWord.difficulty":"hard"}]}' });

  const currentStatistic = await getUserStatistic(userId, userToken)
  || { learnedWords: 0, optional: { gamesWordsProgress:{} } };

  const newStatistic: IUserStatistic = {
    learnedWords: 0,
    optional : currentStatistic.optional,
  };

  const currentProgress = newStatistic.optional.gamesWordsProgress || {};

  correctAnswers.forEach(el=>{
    if (currentProgress[el.id]) {
      currentProgress[el.id].guessed +=1;
      currentProgress[el.id].guessStreak +=1;
    }
    else currentProgress[el.id] = { guessed : 1, failed: 0, guessStreak: 1, word: el.word };
  });
  wrongAnswers.forEach(el=>{
    if (currentProgress[el.id]) {
      currentProgress[el.id].failed +=1;
      currentProgress[el.id].guessStreak = 0;
    }
    else currentProgress[el.id] = { guessed : 0, failed: 1, guessStreak: 0, word: el.word };
  });

  console.log(currentStatistic);

  // const corAns = correctAnswers.map(item=>{
  //   const word: GameStatsProgressWord = {
  //     id: item.id,
  //     failed: currentProgress.find(el=> el.id===item.id)?.failed || 0,
  //     guessed: (currentProgress.find(el=> el.id===item.id)?.guessed || 0) + 1 ,
  //   };
  //   return word;
  // });

  // const wrAns = wrongAnswers.map(item=>{
  //   const word: GameStatsProgressWord = {
  //     id: item.id,
  //     failed: (currentProgress.find(el=> el.id===item.id)?.failed || 0) + 1,
  //     guessed: (currentProgress.find(el=> el.id===item.id)?.guessed || 0)  ,
  //   };
  //   return word;
  // });

  // if (!currentStatistic) currentStatistic = {
  //   learnedWords: 0,
  //   optional: {
  //     gamesWordsProgress: {

  //     }
  //   }
  // }

  // console.log(learnedWords);
  // console.log(hardWords);
  // console.log(currentStatistic);

  // const stats: IUserStatistic = { learnedWords: 0, optional: {} };

  await updateUserStatistic(userId, userToken, newStatistic);
};
