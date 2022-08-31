/* eslint-disable no-underscore-dangle */
import { getUserStatistic, updateUserStatistic } from '@/model/api-statistic';
import { getUserAggregatedWords, getUserWords } from '@/model/api-userWords';
import { IUserStatistic } from '@/model/app-types';
import { GAMES_EDU_PROGRESS } from '@/model/constants';
import { ISprintWord } from '@/model/games-types';

export interface IGameStats {
  total: number;
}

async function saveWordAsLearned (wordId: string) {
  console.log('saveWordAsLearned: ', wordId );
}

async function removeWordFormLearned (wordId: string) {
  console.log('removing from learned word id: ', wordId );
}

export async function saveGameResultStats (
  gameName: string,
  userId: string,
  userToken: string,
  correctAnswers: ISprintWord[],
  wrongAnswers: ISprintWord[],
) {

  const learnedWords = await getUserAggregatedWords(
    userId,
    userToken,
    { filter: '{"$and":[{"userWord.difficulty":"learned"}]}' },
  );
  const hardWords = await getUserAggregatedWords(
    userId,
    userToken,
    { filter: '{"$and":[{"userWord.difficulty":"hard"}]}' },
  );
  const allWords = await getUserWords(    userId,    userToken  );

  console.log('all: ', allWords);

  const isWordinListLearned = (wordId: string) =>
    (learnedWords?.find(el => el.id === wordId || el._id === wordId ));

  const isWordinListHard = (wordId: string) =>
    (hardWords?.find(el => el.id === wordId || el._id === wordId ));

  const manageGuessStreak = (wordId: string, currentStreak: number) => {
    let streak = currentStreak;
    if (!(isWordinListLearned(wordId)) && currentStreak === GAMES_EDU_PROGRESS.guessWordToLearn) {
      saveWordAsLearned(wordId)
        .catch(()=>{});
      streak = 0;
    }
    if (isWordinListHard(wordId) && currentStreak === GAMES_EDU_PROGRESS.guessHardWordToLearn) {
      saveWordAsLearned(wordId)
        .catch(()=>{});
      streak = 0;
    }
    return streak;
  };

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
      const curStreak = currentProgress[el.id].guessStreak + 1;
      currentProgress[el.id].guessStreak = manageGuessStreak(el.id, curStreak);
    }

    else currentProgress[el.id] = { guessed : 1, failed: 0, guessStreak: 1, word: el.word };
  });

  wrongAnswers.forEach(el=>{
    if (currentProgress[el.id]) {
      currentProgress[el.id].failed +=1;
      currentProgress[el.id].guessStreak = 0;
    }
    else currentProgress[el.id] = { guessed : 0, failed: 1, guessStreak: 0, word: el.word };

    if (isWordinListLearned(el.id)) {
      removeWordFormLearned(el.id)
        .catch(()=>{});
    }

  });

  await updateUserStatistic(userId, userToken, newStatistic);
};
