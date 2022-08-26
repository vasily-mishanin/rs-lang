import { useEffect, useRef, useState } from 'react';

export interface PlaySoundItem {
  id: string;
  sourceId: number;
  isPlaying: boolean;
}

export interface PlaySoundProps {
  sources: string[];
  playItem: PlaySoundItem;
}

export const PlaySound = ({ sources, playItem }: PlaySoundProps): JSX.Element => {
  const [playingItem, setPlayItem ]= useState(playItem);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setPlayItem(playItem);
  }, [playItem]);

  useEffect(() => {

    const setPlayer = async (playState: PlaySoundItem) => {
      if (audioRef && audioRef.current) {
        if (playState.isPlaying) {
          audioRef.current.src = sources[playState.sourceId];
          await audioRef.current.play();
        }
      }
    };

    setPlayer(playingItem)
      .catch(() => { })
      .then(() => { })
      .finally(() => { });

  }, [playingItem]);

  const onEnded = () => {};

  return (
    <div className="sound">
      <audio
        onEnded={onEnded}
        ref={audioRef}
      >
        <track kind="captions" />
      </audio>
    </div>
  );
};
