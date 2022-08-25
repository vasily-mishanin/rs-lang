import { useSelector } from 'react-redux';

import { useState } from 'react';

import './SprintPage.pcss';

import { GameResults } from './GameResults/GameResults';
import { IGameResults, SprintBody } from './SprintBody/SprintBody';

import { Button } from '@/components/ui/Button/Button';
import { Dropdown, OptionsType } from '@/components/ui/DropDown/DropDown';
import type { RootState } from '@/store/store';

export const SprintPage = (): JSX.Element => {
  const [level, setLevel] = useState(1);
  const [gameStarted, setgameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [gameResults, setGameResults] = useState<IGameResults>();

  const authState = useSelector((state: RootState) => state.authentication);
  const { isLoggedIn } = authState;
  const levelsCount = isLoggedIn? 7 : 6;

  const dropDownArray: OptionsType[] = Array(levelsCount).fill(1).map((el, i)=> ({ label: 'Уровень ', value: `${+i+1}` }));
  const dropDownChanged = (value: string) => {setLevel(+value);
  };

  const gameIsOver = (results: IGameResults) => {
    setGameEnded(true);
    setgameStarted(false);
    setGameResults(results);
  };

  return (

    <div className="game">
      <h2 className="game_heading">Мини игра &quot;Спринт&quot;</h2>
      <p className="game_subheading">
            В течение одной минуты отвечай соответствует ли слово предложенному переводу.
        <br/>
            Можно кликать по кнопкам, или нажимать клавиши стрелки  &#8678;&nbsp;&#8680;
      </p>

      {!gameStarted && !gameEnded &&
      <div className="game_start_buttons">
        <Dropdown
          options={dropDownArray}
          name="Сложность"
          initial="1"
          onChange={dropDownChanged}
        />
        <Button buttonType='primary' text='Начать' onClick={()=>setgameStarted(true)} />
      </div>
      }

      {gameStarted &&
      <div className="game_body">
        <SprintBody
          level={level}
          page = {5}
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
      </div>
      }

    </div>
  );};
