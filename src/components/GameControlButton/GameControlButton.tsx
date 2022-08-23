import { useState } from 'react';
import './GameControlButton.pcss';

export interface IconPack {
  first: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  second: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export interface GameControlButtonProps  {
  initialState? : boolean;
  onChange :(value: boolean) =>void;
  icons:IconPack;
}

export const GameControlButton = (
  { initialState=true, onChange, icons }: GameControlButtonProps): JSX.Element =>
{
  const [state, setState] = useState(initialState);

  const switchHandler = () => {
    onChange(!state);
    setState(prev=>!prev);
  };

  return (

    <div
      className="control_button"
      onClick = {switchHandler}
      onKeyPress={switchHandler}
      role="button"
      tabIndex={0}
    >
      <div className="control_icon">{state ? <icons.first/> : <icons.second />}</div>
    </div>

  );};
