import './DropDown.pcss';
import classNames from 'classnames';

import { useRef, useState } from 'react';

import { Button } from '../Button/Button';

import { useOnClickOutside } from '@/hooks/useOnClickOutside';

interface OptionsType {
  label: string;
  value: string;
};

interface DropDownProps {
  name : string;
  options: OptionsType[];
  onChange?: ()=>void;
}

export const Dropdown = ({ name, options, onChange }: DropDownProps) => {
  const [drawList, setDrawList] = useState(true);
  const [difficulty, setDifficulty] = useState(1);

  const clickHandler = () => {
    setDrawList(prev=>!prev);
  };

  const ref = useRef<HTMLDivElement | null>(null);

  const onClickOutside = () =>{console.log('outside');  };

  useOnClickOutside(ref, () => onClickOutside());

  return (
    <div ref={ref} className="dropdown">
      <div className="dropdown_button" >
        <Button text={`${name}: ${difficulty}`} buttonType="secondary" onClick={clickHandler}/>
      </div>

      <ul className={
        classNames(
          'dropdown_list',
          drawList && 'dropdown_hide',
        )
      }>
        {options.map(option => (
          <li
            className='dropdown_item'
            key = {option.value}
          >
            {option.label} {option.value}</li>
        ))}

      </ul>
    </div>
  );};
