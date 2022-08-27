import { VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid';

import { useEffect, useRef, useState } from 'react';

import { getRandomIndex, getRandomPage, loadWords } from '../../CommonGamePage/index';

import { PlayAudio } from '@/components/PlayAudio/PlayAudio';
import { PlaySoundEffect, PlaySoundItem } from '@/components/PlaySoundEffect/PlaySoundEffect';
import { Button } from '@/components/ui/Button/Button';
import { GameControlButton } from '@/components/ui/GameControlButton/GameControlButton';
import { Word } from '@/model/app-types';
import { FILESTORAGE_URL } from '@/model/constants';
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

  const setAnswerEffects = (isCorrect: boolean) => {
    if (gameSound)
      setPlaySoundItem({ id: task!.id, isPlaying: true, sourceId: ((isCorrect ? 0 : 1)) });

  };

  const handleAnswer = (answer: string) => {

    if (task) {
      const isAnswerCorect = (task?.wordTranslate === answer);

      if (isAnswerCorect) correctAnswers.current.push(task);
      else wrongAnswers.current.push(task);

      setAnswerEffects(isAnswerCorect);

      const scoreIncrement = isAnswerCorect ? 1 : 0;
      setScore(prev => prev + scoreIncrement);
      // if (isAnswerCorect) setAnimateScore(true);

      getAssignment();
    }

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
    <div className="sprint">
      <div className="sprint_info" >
        <div className="sprint_controls">
          <GameControlButton
            icons={{ 'first': VolumeUpIcon, 'second': VolumeOffIcon }}
            onChange={value => setGameSound(value)}
          />
        </div>
      </div>

      <div className="sprint_form">

        <div className="sprint_ask">
          <div className="streak_ask_cell" />
          <span className="ask_word">{task?.word}</span>
          <div className="streak_ask_cell">
            <PlayAudio
              source={task ? FILESTORAGE_URL + task.audio : ''}
              type='single-button'
            />
          </div>

        </div>
        <div className="sprint_answer">

          {task?.translateProposal?.map((el, i) => (
            <Button
              text={el}
              buttonType='secondary'
              key={`${i*Math.random()}`}
              onClick={()=>handleAnswer(el)}
            />
          ))}
        </div>

      </div>

      <PlaySoundEffect
        playEvent={playSoundItem!}
      />

    </div>

  );
};
