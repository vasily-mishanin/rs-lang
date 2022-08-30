export interface IGameResults {
  correctAnswers: ISprintWord[];
  wrongAnswers: ISprintWord[];
  score: string;
  gameName: string;
}

export interface ISprintWord {
  id: string;
  word: string;
  audio: string;
  image: string;
  wordTranslate: string;
  translateProposal?: string[];
}

export interface GameBodyProps {
  level: number;
  page: number;
  startedFromBook: boolean;
  onGameOver: (results: IGameResults) => void;
  gameName: string;
}

export interface PlaySoundItem {
  id: string;
  sourceId: number;
  isPlaying: boolean;
}

export interface MButtonEvent {
  drawIcon : boolean;
  pickedValue: string;
  correctValue: string;
}
