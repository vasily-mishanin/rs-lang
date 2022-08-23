import { ArrowsExpandIcon } from '@heroicons/react/outline';
import { VolumeOffIcon, VolumeUpIcon, ViewGridIcon } from '@heroicons/react/solid';

import { useState } from 'react';

import { Timer } from '../Timer/Timer';

import { Button } from '@/components/Button/Button';
import { GameControlButton } from '@/components/GameControlButton/GameControlButton';

import './SprintBody.pcss';

export const SprintBody = (): JSX.Element => {
  const [score, setScore] = useState(0);

  return (
    <div className="sprint">
      <div className="sprint_info" >
        <div className="sprint_controls">
          <GameControlButton
            icons={ { 'first': VolumeUpIcon, 'second': VolumeOffIcon } }
            onChange={value=>{console.log(value);}}
          />
          <GameControlButton
            icons={ { 'first': ArrowsExpandIcon, 'second': ViewGridIcon } }
            onChange={value=>{console.log(value);}}
          />
        </div>
        <div className="sprint_score">Score: {score}</div>
        <div className="sprint_timer">
          <Timer seconds={60} onTimeUp={()=>console.log('time us up!')} />
        </div>

      </div>
      <div className="sprint_form">

        <div className="sprint_streak">
          <span>✔️</span><span>✔️</span><span>✔️</span>
          <span>x10</span>
        </div>

        <div className="sprint_picture">😃</div>

        <div className="sprint_ask">word</div>
        <div className="sprint_answer">answer</div>

        <div className="sprint_buttons">
          <Button
            text='&#9664; Неверно'
            buttonType='decline'
          />
          <Button
            text='Верно &#9654;'
            buttonType='accept'
          />
        </div>
      </div>

    </div>

  );};
