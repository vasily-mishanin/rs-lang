import { ArrowsExpandIcon } from '@heroicons/react/outline';
import { VolumeOffIcon, VolumeUpIcon, ViewGridIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
// import { useSearchParams } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';

import { StreakCounter } from '../StreakCounter/StreakCounter';
import { Timer } from '../Timer/Timer';

import './SprintBody.pcss';
import { PlayAudio } from '@/components/PlayAudio/PlayAudio';
import { PlaySoundEffect, PlaySoundItem } from '@/components/PlaySoundEffect/PlaySoundEffect';
import { Button } from '@/components/ui/Button/Button';
import { GameControlButton } from '@/components/ui/GameControlButton/GameControlButton';
import { useOnKeyUp } from '@/hooks/useOnKeyUpDocument';
import { getWords } from '@/model/api-words';
import { Word } from '@/model/app-types';

const FILESTORAGE_URL = 'https://rss-rs-lang.herokuapp.com/';

const baseScore = 10;

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

export interface IGameResults {
  correctAnswers: ISprintWord[];
  wrongAnswers: ISprintWord[];
  score: number;
}
export interface SprintBodyProps {
  level: number;
  page: number;
  onGameOver: (results: IGameResults)=>void;
}

const getRandomIndex = (arrLength: number) => Math.floor(Math.random() * arrLength);

export const SprintBody = ({ level, page, onGameOver }: SprintBodyProps): JSX.Element => {
  const [firstRun, setFirstRun] = useState(true);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [multiplier, setmultiplier] = useState(1);
  const [task, setTask] = useState<ISprintWord>();
  const [smileFace, setSmileFace] = useState('🙂');
  const [animateSmile, setAnimateSmile] = useState(false);
  const [animateScore, setAnimateScore] = useState(false);
  const [animateMultiplier, setAnimateMultiplier] = useState(false);

  const [playSoundItem, setPlaySoundItem] = useState<PlaySoundItem>();

  const usedWords = useRef<ISprintWord[]>([]);
  const wordList = useRef<ISprintWord[]>([]);
  const currentWords = useRef<ISprintWord[]>([]);

  const correctAnswers= useRef<ISprintWord[]>([]);
  const wrongAnswers = useRef<ISprintWord[]>([]);

  const getAssignment = () => {

    if (wordList.current.length > 0) {
      const index = getRandomIndex(wordList.current.length);
      const assigment = wordList.current[index];

      wordList.current.splice(index, 1);
      usedWords.current.push(assigment);

      if (Math.random() < 0.5) {
        const randomIndex = getRandomIndex(currentWords.current.length);

        assigment.translateProposal = currentWords.current[randomIndex].wordTranslate;
      } else assigment.translateProposal = assigment.wordTranslate;

      setTask(assigment);
    }
    else console.log('no more words');

  };

  const gameOver = () => {
    // console.log('time us up!');
    const gameResults: IGameResults = {
      correctAnswers : correctAnswers.current,
      wrongAnswers :  wrongAnswers.current,
      score,
    };

    onGameOver(gameResults);
  };

  useEffect(() => {
    if (firstRun) {
      getWords(`${level}`, `${page}`)
        .then(res => res.json())
        .then((data: Word[]) => {
          wordList.current = [...data];
          currentWords.current = [...data];
          getAssignment();
        })
        .catch(err => {console.log(err);
        });

      setFirstRun(false);
    }
  }, []);

  const setAnswerEffects = (isCorrect: boolean) => {
    const getSmile = isCorrect
      ? happySmiles[getRandomIndex(happySmiles.length)]
      : sadSmiles[getRandomIndex(sadSmiles.length)];

    setSmileFace(getSmile);
    setAnimateSmile(true);

    setPlaySoundItem({ id: task!.id , isPlaying: true, sourceId: ((isCorrect? 0 : 1)) });

  };

  const handleStreak = (isCorrect: boolean) => {
    if (isCorrect) {
      if (streak === 2) {
        setmultiplier(prev => prev + 1);
        setAnimateMultiplier(true);
        setStreak(prev => prev + 1);
      } else if (streak === 3) setStreak(0);
      else setStreak(prev => prev + 1);

    } else setStreak(0);
  };

  const handleAnswer = (answer: AnswerType) => {
    if (task){
      let isAnswerCorect = false;
      if (task?.wordTranslate === task?.translateProposal && answer === 'accept') isAnswerCorect = true;
      else if (task?.wordTranslate !== task?.translateProposal && answer === 'decline') isAnswerCorect = true;
      else isAnswerCorect = false;

      if (isAnswerCorect) correctAnswers.current.push(task);
      else wrongAnswers.current.push(task);

      setAnswerEffects(isAnswerCorect);

      handleStreak(isAnswerCorect);

      const scoreIncrement = isAnswerCorect ? multiplier * baseScore : 0;
      setScore(prev => prev + scoreIncrement);
      if (isAnswerCorect) setAnimateScore(true);

      getAssignment();
    }

  };

  const acceptHandler = () => { handleAnswer('accept'); };

  const declineHandler = () => { handleAnswer('decline'); };

  useOnKeyUp((code: string) => {
    if (code === 'ArrowLeft') declineHandler();
    else if (code === 'ArrowRight') acceptHandler();
  });

  return (
    <div className="sprint">
      {/* <p>Page: {searchParams.get('page')}</p>
      <p>Level: {searchParams.get('level')}</p> */}
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
        <div className='sprint_score'>
          <span className="score_text">Score: </span>
          <div
            className={animateScore ? 'score_animate' : ''}
            onAnimationEnd={() => setAnimateScore(false)}
          >
            {score}
          </div>
        </div>
        <div className="sprint_timer">
          <Timer seconds={60} onTimeUp={gameOver} />
        </div>

      </div>
      <div className="sprint_form">

        <div className="sprint_streak">
          <div className="streak_line_cell" />
          <StreakCounter currentStreak={streak} />
          <div
            className="streak_line_cell"
          >
            <div
              className={classNames('multi_value', animateMultiplier ? 'score_animate' : '')}
              onAnimationEnd={() => setAnimateMultiplier(false)}
            >
               x {baseScore * multiplier}
            </div>
          </div>
        </div>

        <div
          onAnimationEnd={() => setAnimateSmile(false)}
          className={classNames('sprint_picture', animateSmile && 'smile_animate')}
        >
          {smileFace}
        </div>

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

      <PlaySoundEffect
        playEvent={playSoundItem!}
      />

    </div>

  );
};
