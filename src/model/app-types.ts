import { MakeGenerics } from '@tanstack/react-location';

export interface User {
  userId?: string;
  email: string;
  password: string;
  name?: string;
  message?: string;
  token?: string;
  refreshToken?: string;
}

export interface Word {
  id: string;
  _id? :string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface UserWord {
  difficulty:string;
  optional:{
    numberOfMistakesSprint?: number;
    numberOfMistakesAudio?: number;
    numberOfRightGuessSprint?: number;
    numberOfRightGuessAudio?: number;
    postDate?: Date;
    lastUpdatedDate?: Date;
    theWord:string;
    wordId:string;
  };
}

export type LocationGenerics = MakeGenerics<{
  LoaderData: {
    words?: Word[];
  };
  Params: {
    group: string;
    page: string;
  };
  Search: {
    group: string;
    page: string;
  };
}>;

export interface ProgressWordMap {
  [id: string] : GameStatsProgressWord;
}

export interface GameStatsProgressWord {
  word?: string;
  guessed: number;
  failed: number;
  guessStreak : number;
}
export interface IUserStats {
  // [index: string]: string ;
  gamesWordsProgress: ProgressWordMap;
}

export interface IUserStatistic {
  learnedWords: number;
  optional : IUserStats;
}
