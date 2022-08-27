import { useSearchParams } from 'react-router-dom';

import { useEffect, useRef, useState } from 'react';

import './SprintPage.pcss';

import { IGameResults, SprintBody } from './SprintBody/SprintBody';

import { GameDescription } from '@/components/games/GameDescription/GameDescription';
import { GameDifficulty } from '@/components/games/GameDifficulty/GameDifficulty';
import { GameResults } from '@/components/games/GameResults/GameResults';
import { Button } from '@/components/ui/Button/Button';

export const SprintPage = (): JSX.Element => {
  const [level, setLevel] = useState(1);
  const [currPage, setCurrPage] = useState(1);

  const [startedFromTextBook, setstartedFromTextBook] = useState(false);
  const [gameStarted, setgameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameResults, setGameResults] = useState<IGameResults>();

  const [firstRun, setFirstRun] = useState(true);

  const page = useRef('');
  const group = useRef('');

  const dropDownChanged = (value: string) => {setLevel(+value - 1);  };

  const gameIsOver = (results: IGameResults) => {
    setGameEnded(true);
    setgameStarted(false);
    setGameResults(results);
  };

  const restartGame = () => {
    setGameEnded(false);
    setgameStarted(true);
  };

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (firstRun) {

      page.current = searchParams.get('page') || '';
      group.current = searchParams.get('group') || '';

      if (page.current && group.current){
        if (+page.current >=0 && +page.current <= 29 && +group.current >=0 && +group.current <= 5) {
          setLevel(+group.current);
          setCurrPage(+page.current);

          setgameStarted(true);
          setstartedFromTextBook(true);
        }
      }

      setFirstRun(false);

    }
  }, [firstRun, searchParams]);

  return (
    <div className="game">

      {!gameStarted && !gameEnded &&
      <GameDescription
        name='Спринт'
        description={[
          'В течение одной минуты отвечай соответствует ли слово предложенному переводу.',
          'Можно кликать по кнопкам, или нажимать клавиши стрелки',
        ]}
      />
      }

      {!gameStarted && !gameEnded &&
      <GameDifficulty
        onChangeDiff={dropDownChanged}
        onStart={()=>setgameStarted(true)}/>
      }

      {gameStarted &&
      <div className="game_body">
        <SprintBody
          level={level}
          page = {currPage}
          startedFromBook = {startedFromTextBook}
          onGameOver = {gameIsOver}
        />
      </div>
      }

      {gameEnded &&
      <div className="game_body">
        <GameResults
          correctAnswers={gameResults!.correctAnswers}
          wrongAnswers={gameResults!.wrongAnswers}
          score = {gameResults!.score}
        />
        <div className="game_restart">
          <Button buttonType='primary' text='Играть снова' onClick={restartGame} />
        </div>

      </div>
      }

    </div>
  );};
