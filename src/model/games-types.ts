export interface IGameResults {
  correctAnswers: ISprintWord[];
  wrongAnswers: ISprintWord[];
  score: number;
}

export interface ISprintWord {
  id: string;
  word: string;
  audio: string;
  wordTranslate: string;
  translateProposal?: string[];
}

export interface GameBodyProps {
  level: number;
  page: number;
  startedFromBook: boolean;
  onGameOver: (results: IGameResults) => void;
}

export interface PlaySoundItem {
  id: string;
  sourceId: number;
  isPlaying: boolean;
}
