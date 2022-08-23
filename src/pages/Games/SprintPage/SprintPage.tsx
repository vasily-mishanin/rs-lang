import { useState } from 'react';

import { Dropdown } from '@/components/DropDown/DropDown';
import './SprintPage.pcss';

export const SprintPage = (): JSX.Element => {
  const [level, setLevel] = useState(1);

  return (

    <div className="game">
      <h2 className="game_heading">Мини игра &quot;Спринт&quot;</h2>
      <p className="game_subheading">
            В течение одной минуты отвечай соответствует ли слово предложенному переводу.
        <br/>
            Можно кликать по кнопкам, или нажимать клавиши стрелки  &#8678;&nbsp;&#8680;
      </p>

      <Dropdown
        options={[
          { label: 'Уровень ', value: '1' },
          { label: 'Уровень', value: '2' },
          { label: 'Уровень', value: '3' },
        ]}
        name="Сложность"
      />

    </div>
  );};
