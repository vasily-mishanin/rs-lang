import { VolumeOffIcon, VolumeUpIcon } from '@heroicons/react/solid';

import { useEffect, useRef, useState } from 'react';

import { getRandomIndex, loadWords } from '../../CommonGamePage/index';

import { PlaySoundEffect } from '@/components/PlaySoundEffect/PlaySoundEffect';
import { Speaker } from '@/components/games/Speaker/Speaker';
import { GameControlButton } from '@/components/ui/GameControlButton/GameControlButton';
import { MarkButton } from '@/components/ui/MarkButton/MarkButton';
import { Word } from '@/model/app-types';
import { FILESTORAGE_URL } from '@/model/constants';
import { IGameResults, GameBodyProps, ISprintWord, PlaySoundItem, MButtonEvent } from '@/model/games-types';

import './AudioTrainBody.pcss';

export const AudioTrainBody = (
  { level, onGameOver, page, startedFromBook }: GameBodyProps): JSX.Element => {

  const [firstRun, setFirstRun] = useState(true);
  const [score, setScore] = useState(0);

  const [task, setTask] = useState<ISprintWord>();

  const [buttonEvent, setButtonEvent] = useState<MButtonEvent>();
  const [showCorrectAnswer, setshowCorrectAnswer] = useState(false);

  const [playSoundItem, setPlaySoundItem] = useState<PlaySoundItem>();
  const [playTaskAudio, setPlayTaskAudio] = useState<PlaySoundItem>();
  const [gameSound, setGameSound] = useState(true);

  const usedWords = useRef<ISprintWord[]>([]);
  const usedPages = useRef<number[]>([]);
  const wordList = useRef<ISprintWord[]>([]);
  const currentWords = useRef<ISprintWord[]>([]);

  const correctAnswers = useRef<ISprintWord[]>([]);
  const wrongAnswers = useRef<ISprintWord[]>([]);

  const lastPickedAnswer = useRef('');

  const gameOver = () => {
    const gameResults: IGameResults = {
      correctAnswers: correctAnswers.current,
      wrongAnswers: wrongAnswers.current,
      score,
    };

    onGameOver(gameResults);
  };

  const resetAnswerButtons = () => {
    setButtonEvent (
      {
        drawIcon: false,
        correctValue: '',
        pickedValue: '',
      },
    );
  };

  const getAssignment = () => {

    if (wordList.current.length > 0) {
      const index = getRandomIndex(wordList.current.length, -1);
      const assigment = wordList.current[index];

      wordList.current.splice(index, 1);
      usedWords.current.push(assigment);

      assigment.translateProposal = Array(4).fill('')
        .map(() => currentWords.current[getRandomIndex(
          currentWords.current.length, index)].wordTranslate);

      assigment.translateProposal.push(assigment.wordTranslate);

      assigment.translateProposal.sort();

      setTask(assigment);
      setPlayTaskAudio({ id: assigment.id, isPlaying: true, sourceId: 1 });

    } else gameOver();

  };

  const setAnswerEffects = (isCorrect: boolean) => {
    if (gameSound)
      setPlaySoundItem({ id: task!.id, isPlaying: true, sourceId: ((isCorrect ? 0 : 1)) });

    setButtonEvent (
      {
        drawIcon: true,
        correctValue: task!.wordTranslate,
        pickedValue:  lastPickedAnswer.current,
      },
    );

  };

  const handleAnswer = (answer: string) => {

    if (task) {
      const isAnswerCorect = (task?.wordTranslate === answer);

      if (isAnswerCorect) correctAnswers.current.push(task);
      else wrongAnswers.current.push(task);

      lastPickedAnswer.current = answer;

      setAnswerEffects(isAnswerCorect);

      const scoreIncrement = isAnswerCorect ? 1 : 0;
      setScore(prev => prev + scoreIncrement);
      // if (isAnswerCorect) setAnimateScore(true);

      setshowCorrectAnswer(true);
      // setTimeout(() => {
      //   resetAnswerButtons();
      //   getAssignment();
      //   setshowCorrectAnswer(false);
      // }, 2000);

    }

  };

  useEffect(() => {
    if (firstRun) {
      usedPages.current.push(page);

      loadWords(level, page)
        .then((data: Word[]) => {

          wordList.current = [...data];
          currentWords.current = [...data];
          setFirstRun(false);
          resetAnswerButtons();
          getAssignment();

        }).catch(() => { });
    }
  }, [firstRun, level, page]);

  return (
    <div className="audiogame">
      <div className="audiogame_info" >
        <div className="audiogame_controls">
          <GameControlButton
            icons={{ 'first': VolumeUpIcon, 'second': VolumeOffIcon }}
            onChange={value => setGameSound(value)}
          />
        </div>
      </div>

      <div className="audiogame_form">

        <div className="audiogame_ask">

          {!showCorrectAnswer &&
                    <Speaker
                      source={task ? FILESTORAGE_URL + task.audio : ''}
                      playEvent={playTaskAudio!}
                    />
          }

          {showCorrectAnswer &&
          <div className="audiogame_ans">
            <div className="answer_image_wrapper">
              <img
                className='answer_image'
                src={task ? FILESTORAGE_URL + task.image : ''}
                alt={task?.word} />
            </div>

            <p className='answer_text'>{task?.word}</p>
          </div>

          }

        </div>

        <div className="audiogame_answers">

          {task?.translateProposal?.map((el, i) => (
            <div className='audiogame_answer' key={`${(i+1) * Math.random()}`} >

              <MarkButton
                event={buttonEvent!}
                text={el}
                index={i}
                onClick={() => handleAnswer(el)}
              />

              <span className ='audiogame_answer_index' >[{i}]</span>
            </div>
          ))}
        </div>

      </div>

      <PlaySoundEffect
        playEvent={playSoundItem!}
      />

    </div>

  );
};
