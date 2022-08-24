import { ArrowsExpandIcon } from '@heroicons/react/outline';
import { VolumeOffIcon, VolumeUpIcon, ViewGridIcon } from '@heroicons/react/solid';

import { useState } from 'react';

import { Timer } from '../Timer/Timer';

import './SprintBody.pcss';
import { Button } from '@/components/ui/Button/Button';
import { GameControlButton } from '@/components/ui/GameControlButton/GameControlButton';
import { PlayAudio } from '@/components/PlayAudio/PlayAudio';

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

        <div className="sprint_ask">
          word
          <PlayAudio source= "https://file-examples.com/storage/fe63a55b7d630545e96d964/2017/11/file_example_MP3_700KB.mp3" />
        </div>
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
