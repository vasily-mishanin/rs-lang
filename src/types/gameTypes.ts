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
  translateProposal?: string;
}
