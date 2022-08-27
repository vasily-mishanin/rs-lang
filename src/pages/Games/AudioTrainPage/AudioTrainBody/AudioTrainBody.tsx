import { useEffect, useRef, useState } from 'react';

import { getRandomIndex, getRandomPage, loadWords } from '../../CommonGamePage/index';

import { PlaySoundItem } from '@/components/PlaySoundEffect/PlaySoundEffect';
import { Word } from '@/model/app-types';
import { IGameResults, GameBodyProps, ISprintWord } from '@/types/gameTypes';

import './AudioTrainBody.pcss';

export const AudioTrainBody = (
  { level, onGameOver, page, startedFromBook }: GameBodyProps): JSX.Element => {

  const [firstRun, setFirstRun] = useState(true);
  const [score, setScore] = useState(0);

  const [task, setTask] = useState<ISprintWord>();

  const [playSoundItem, setPlaySoundItem] = useState<PlaySoundItem>();
  const [gameSound, setGameSound] = useState(true);

  const usedWords = useRef<ISprintWord[]>([]);
  const usedPages = useRef<number[]>([]);
  const wordList = useRef<ISprintWord[]>([]);
  const currentWords = useRef<ISprintWord[]>([]);

  const correctAnswers = useRef<ISprintWord[]>([]);
  const wrongAnswers = useRef<ISprintWord[]>([]);

  const gameOver = () => {
    const gameResults: IGameResults = {
      correctAnswers: correctAnswers.current,
      wrongAnswers: wrongAnswers.current,
      score,
    };

    onGameOver(gameResults);
  };

  const getAssignment = () => {
    if (wordList.current.length > 0) {
      const index = getRandomIndex(wordList.current.length, -1);
      const assigment = wordList.current[index];

      wordList.current.splice(index, 1);
      usedWords.current.push(assigment);

      assigment.translateProposal = Array(4).fill('')
        .map(()=>currentWords.current[getRandomIndex(
          currentWords.current.length, index)].wordTranslate);

      assigment.translateProposal.push(assigment.wordTranslate);

      assigment.translateProposal.sort();

      setTask(assigment);
    }
    else if (!startedFromBook) {
      const nextPage = getRandomPage(usedPages.current);
      usedPages.current.push(nextPage);

      loadWords(level, nextPage)
        .then((data: Word[]) => {
          wordList.current = [...data];
          currentWords.current = [...data];
          getAssignment();
        })
        .catch(() => { });
    }
    else gameOver();

  };

  useEffect(() => {
    if (firstRun) {
      usedPages.current.push(page);

      loadWords(level, page)
        .then((data: Word[])=>{

          wordList.current = [...data];
          currentWords.current = [...data];
          setFirstRun(false);
          getAssignment();

        }).catch(()=>{});
    }
  }, [firstRun, level, page]);

  return (
    <div className="streak_line">AUDIO</div>

  );
};
