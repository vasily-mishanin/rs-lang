import { useSelector } from 'react-redux';

import { addWordsToStatistic, emptyStatistic, getUserStatistic, updateUserStatistic } from '@/model/api-statistic';
import { getUserWords, setUserWordDifficulty } from '@/model/api-userWords';
import { StatsWordDifficulty, WordStats } from '@/model/app-types';
import { GAMES_EDU_PROGRESS } from '@/model/constants';
import { ISprintWord } from '@/model/games-types';
import { RootState } from '@/store/store';

export interface IGameStats {
  total: number;
}

export async function useSaveGameResultStats (
  gameName: string,
  userId: string,
  userToken: string,
  correctAnswers: ISprintWord[],
  wrongAnswers: ISprintWord[],
) {

  const authState = useSelector((state: RootState) => state.authentication);

  if (authState.isLoggedIn) {

    const allWords = await getUserWords(userId, userToken);
    const learnedWords = allWords!.filter(el => el.difficulty === 'learned').map(el => el.optional.wordId);
    const hardWords = allWords!.filter(el => el.difficulty === 'hard').map(el => el.optional.wordId);

    const setWordDifficulty = async (word: ISprintWord, difficulty: StatsWordDifficulty) => {
      const isEntryExisted = !!(allWords?.find(el => el.optional.wordId === word.id));
      await setUserWordDifficulty(userId, userToken, word.id, word.word, difficulty, isEntryExisted)
        .catch(() => { });
    };

    const removeWordFormLearned = async (word: ISprintWord) => {
      // await deleteUserWord(userId, wordId, userToken);
      await setWordDifficulty(word, 'new');
    };

    const saveWordAsLearned = async (word: ISprintWord) => {
      await setWordDifficulty(word, 'learned');

      addWordsToStatistic(
        authState.userId,
        authState.token,
        [ { id: word.id, type: 'learned' }],
      ).catch(() => { });
    };

    const saveWordsAsNew = (words: ISprintWord[]) => {
      words.forEach(el => {
        setWordDifficulty(el, 'new').catch(() => { });
      });

      const newStats: WordStats[] = words.map(el => ({ id: el.id, type: 'new' }));
      addWordsToStatistic(
        authState.userId,
        authState.token,
        newStats,
      ).catch(() => { });

    };

    const isWordinListLearned = (wordId: string) => !!(learnedWords.find(el => el === wordId));

    const isWordinListHard = (wordId: string) => !!(hardWords?.find(el => el === wordId));

    const manageGuessStreak = (word: ISprintWord, currentStreak: number) => {
      let streak = currentStreak;
      if (
        !(isWordinListLearned(word.id))
        && currentStreak === GAMES_EDU_PROGRESS.guessWordToLearn
      ) {
        saveWordAsLearned(word)
          .catch(() => { });
        streak = 0;
      }
      if (isWordinListHard(word.id) && currentStreak === GAMES_EDU_PROGRESS.guessHardWordToLearn) {
        saveWordAsLearned(word)
          .catch(() => { });
        streak = 0;
      }
      return streak;
    };

    const currentStatistic = await getUserStatistic(userId, userToken) || emptyStatistic;

    const newStatistic = { ...currentStatistic };

    const currentProgress = newStatistic.optional.gamesWordsProgress || {};

    const newWords = [...correctAnswers, ...wrongAnswers]
      .filter(el => (!isWordinListLearned(el.id) && !isWordinListHard(el.id)));

    saveWordsAsNew(newWords);

    correctAnswers.forEach(el => {
      if (currentProgress[el.id]) {
        currentProgress[el.id].guessed += 1;
        const curStreak = currentProgress[el.id].guessStreak + 1;
        currentProgress[el.id].guessStreak = manageGuessStreak(el, curStreak);
      }

      else currentProgress[el.id] = { guessed: 1, failed: 0, guessStreak: 1, word: el.word };
    });

    wrongAnswers.forEach(el => {
      if (currentProgress[el.id]) {
        currentProgress[el.id].failed += 1;
        currentProgress[el.id].guessStreak = 0;
      }
      else currentProgress[el.id] = { guessed: 0, failed: 1, guessStreak: 0, word: el.word };

      if (isWordinListLearned(el.id)) {
        removeWordFormLearned(el)
          .catch(() => { });
      }

    });

    await updateUserStatistic(userId, userToken, newStatistic);

  }

}
