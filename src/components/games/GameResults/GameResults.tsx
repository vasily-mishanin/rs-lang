import classNames from 'classnames';

import { IGameResults } from '../../../pages/Games/SprintPage/SprintBody/SprintBody';
import './GameResults.pcss';

export const GameResults =
(  { correctAnswers,  wrongAnswers, score }: IGameResults): JSX.Element => {

  const getResultDesision = () => {
    if (wrongAnswers.length === 0) return 'Отличный результат!';
    if (correctAnswers.length > wrongAnswers.length) return 'Хороший результат, продолжай учиться!';
    return 'Продолжай учиться, в следующий раз получится';
  };

  return (
    <div className="results">
      <h4>Твой счет : {score}</h4>
      <h4>{getResultDesision()}</h4>
      <div className="results_table">

        <div className={classNames('results_list', 'results_correct')}>
          <h4>Правильные ответы:</h4>
          {correctAnswers.map(el => (
            <div key={el.id} className="">
              {el.word}
            </div>
          ))}
        </div>
        <div className={classNames('results_list', 'results_wrong')}>
          <h4>Ошибки:</h4>
          {wrongAnswers.map(el => (
            <div key={el.id} className="">
              {el.word}
            </div>
          ))}
        </div>
      </div>
    </div>

  );};
