import './PlayAudio.pcss';

import { PlayIcon, PauseIcon } from '@heroicons/react/solid';

import { useEffect, useRef, useState } from 'react';

import { GameControlButton } from '@/components/ui/GameControlButton/GameControlButton';

export type AudioControlsType = 'default' | 'single-button';
export interface PlayAudioProps {
  source: string;
  type: AudioControlsType;
}

export const PlayAudio = ({ source, type }: PlayAudioProps): JSX.Element => {
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

  const onPlaying = () => { };

  const onEnded = () => setisPlaying(false);

  return (
    <div className="audio">
      <audio
        ref={audioRef}
        src={source}
        onTimeUpdate={onPlaying}
        onEnded={onEnded}
        controls={type === 'default'}
      >
        <track kind="captions" />
      </audio>

      {type !== 'default' &&
        <GameControlButton
          changeStateOutside={!isPlaying}
          icons={{ 'first': PlayIcon, 'second': PauseIcon }}
          onChange={() => { setisPlaying(prev => !prev); }}
        />
      }
    </div>
  );
};
