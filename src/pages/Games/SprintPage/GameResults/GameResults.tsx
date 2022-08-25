import classNames from 'classnames';

import { IGameResults } from '../SprintBody/SprintBody';
import './GameResults.pcss';

export const GameResults =
(  { correctAnswers,  wrongAnswers, score }: IGameResults): JSX.Element => {
  const x = 0;
  return (
    <div className="results">
      <h4>Your score is : {score}</h4>
      <div className="results_table">

        <div className={classNames('results_list', 'results_correct')}>
          <h4>Correct answers</h4>
          {correctAnswers.map(el => (
            <div key={el.id} className="">
              {el.word}
            </div>
          ))}
        </div>
        <div className={classNames('results_list', 'results_wrong')}>
          <h4>Wrong answers</h4>
          {wrongAnswers.map(el => (
            <div key={el.id} className="">
              {el.word}
            </div>
          ))}
        </div>
      </div>
    </div>

  );};
