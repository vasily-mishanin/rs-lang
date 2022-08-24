import './PlayAudioButton.pcss';

import { PlayIcon, PauseIcon } from '@heroicons/react/solid';

import { useEffect, useRef, useState } from 'react';

import { GameControlButton } from '@/components/GameControlButton/GameControlButton';

export interface PlayAudioProps {
  source: string;
}

export const PlayAudio = ({ source }: PlayAudioProps): JSX.Element => {
  const [isPlaying, setisPlaying] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const setPlayer = async (playState: boolean) => {
    if (audioRef && audioRef.current) {
      if (playState) await audioRef.current.play();
      else audioRef.current.pause();
    }
  };

  useEffect(() => {
    setPlayer(isPlaying)
      .catch(() => { })
      .then(() => { })
      .finally(() => { });

  }, [isPlaying]);

  const onPlaying = () =>{
    if (audioRef && audioRef.current?.paused) console.log('setPlaying(false)');
  };

  const onEnded = () =>{
    console.log('Track ended');
  };

  return (
    <div className="audio">
      <audio
        ref={audioRef}
        src={source}
        onTimeUpdate={onPlaying}
        onEnded = {onEnded}
        controls>
        <track kind="captions" />
      </audio>

      <GameControlButton
        icons={{ 'first': PlayIcon, 'second': PauseIcon }}
        onChange={(value: boolean) => { setisPlaying(!value); }}
      />

    </div>

  );
};
