import { ArrowsExpandIcon } from '@heroicons/react/outline';
import { VolumeOffIcon, VolumeUpIcon, ViewGridIcon } from '@heroicons/react/solid';
import classNames from 'classnames';

import { useEffect, useRef, useState } from 'react';

import { Timer } from '../Timer/Timer';

import './SprintBody.pcss';
import { PlayAudio } from '@/components/PlayAudio/PlayAudio';
import { Button } from '@/components/ui/Button/Button';
import { GameControlButton } from '@/components/ui/GameControlButton/GameControlButton';
import { useOnKeyUp } from '@/hooks/useOnKeyUpDocument';

const FILESTORAGE_URL = 'https://rss-rs-lang.herokuapp.com/';

const happySmiles = ['😊', '😆', '😁', '😄', '😅', '🙃', '😃', '😋'];
const sadSmiles = ['😬', '😐', '🤔', '😑', '🙄', '😕'];

type AnswerType = 'accept' | 'decline';

export interface ISprintWord {
  id: string;
  word: string;
  audio: string;
  wordTranslate: string;
  translateProposal?: string;
}

export interface SprintBodyProps {
  level: number;
  words: ISprintWord[];
}

const getRandomIndex = (arrLength: number) => Math.floor(Math.random() * arrLength);

export const SprintBody = ({ level, words }: SprintBodyProps): JSX.Element => {
  const [firstRun, setFirstRun] = useState(true);
  const [score, setScore] = useState(0);
  const [task, setTask] = useState<ISprintWord>();
  const [smileFace, setSmileFace] = useState('🙂');
  const [animateSmile, setAnimateSmile] = useState(false);

  const usedWords = useRef<ISprintWord[]>([]);
  const wordsClone = Array.from(words);
  const wordList = useRef<ISprintWord[]>(wordsClone);

  const getAssignment = () => {
    if (wordList.current.length > 0) {
      const index = getRandomIndex(wordList.current.length);
      const assigment = wordList.current[index];

      wordList.current.splice(index, 1);
      usedWords.current.push(assigment);

      if (Math.random() < 0.5) {
        const randomIndex = getRandomIndex(words.length);
        assigment.translateProposal = words[randomIndex].wordTranslate;
      } else assigment.translateProposal = assigment.wordTranslate;

      setTask(assigment);
    }
    else console.log('no more words');

  };

  useEffect(() => {
    if (firstRun) {
      getAssignment();
      setFirstRun(false);
    }
  }, []);

  const setAnswerEffects = (isCorrect: boolean) => {
    const getSmile = isCorrect
      ? happySmiles[getRandomIndex(happySmiles.length)]
      : sadSmiles[getRandomIndex(sadSmiles.length)];

    setSmileFace(getSmile);
    setAnimateSmile(true);
  };

  const handleAnswer = (answer: AnswerType) => {
    let isAnswerCorect = false;
    if (task?.wordTranslate === task?.translateProposal && answer === 'accept') isAnswerCorect = true;
    else if (task?.wordTranslate !== task?.translateProposal && answer === 'decline') isAnswerCorect = true;
    else isAnswerCorect = false;

    setAnswerEffects(isAnswerCorect);
    getAssignment();
  };

  const acceptHandler = () => { handleAnswer('accept'); };

  const declineHandler = () => { handleAnswer('decline'); };

  useOnKeyUp((code: string) => {
    if (code === 'ArrowLeft') declineHandler();
    else if (code === 'ArrowRight') acceptHandler();
  });

  return (
    <div className="sprint">
      <div className="sprint_info" >
        <div className="sprint_controls">
          <GameControlButton
            icons={{ 'first': VolumeUpIcon, 'second': VolumeOffIcon }}
            onChange={value => { console.log(value); }}
          />
          <GameControlButton
            icons={{ 'first': ArrowsExpandIcon, 'second': ViewGridIcon }}
            onChange={value => { console.log(value); }}
          />
        </div>
        <div className="sprint_score">Score: {score}</div>
        <div className="sprint_timer">
          <Timer seconds={60} onTimeUp={() => console.log('time us up!')} />
        </div>

      </div>
      <div className="sprint_form">

        <div className="sprint_streak">
          <span>✔️</span><span>✔️</span><span>✔️</span>
          <span>x10</span>
        </div>

        <div
          onAnimationEnd ={()=>setAnimateSmile(false)}
          className={
            classNames(
              'sprint_picture',
              animateSmile && 'smile_animate',
            )}
        >
          {smileFace}
        </div>

        <div className="sprint_ask">
          <span className="ask_word">{task?.word}</span>
          <PlayAudio
            source={task ? FILESTORAGE_URL + task.audio : ''}
            type='single-button'
          />
        </div>
        <div className="sprint_answer">{task?.translateProposal}</div>

        <div className="sprint_buttons">
          <Button
            text='&#9664; Неверно'
            buttonType='decline'
            onClick={declineHandler}
          />
          <Button
            text='Верно &#9654;'
            buttonType='accept'
            onClick={acceptHandler}
          />
        </div>
      </div>

    </div>

  );
};
