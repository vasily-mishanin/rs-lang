// import { useSelector } from 'react-redux';
import { Outlet, Link } from '@tanstack/react-location';

import React, { useState } from 'react';

import './TextbookMainPage.pcss';

const cities = ['SAR', 'NZ', 'AU', 'CA', 'US', 'UK'];

const TextbookMainPage = (): JSX.Element => {
  const [activeGroup, setActiveGroup] = useState<number>();

  console.log('TextbookMainPage - group', activeGroup);

  const START_PAGE = 0;
  const NUMBER_OF_GROUPS = 6;
  const groups = [...Array(NUMBER_OF_GROUPS).keys()];

  const handleGroupClick = (groupNumber:number) => {
    console.log('handleGroupClick');
    setActiveGroup(groupNumber);
  };

  return (
    <section className="textbook">
      <ul className="groups-list">
        {groups.map(gr => (
          <li key={gr} className={`group-${gr + 1} ${activeGroup === gr + 1 ? 'group-active' : ''}`} >
            <Link to={`/textbook/${gr}/${START_PAGE}`} onClick={()=>handleGroupClick(gr+1)}>
              <span className='group-badge' data-tip="What city is it?">{cities[gr]}</span>
            </Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </section>
  );
};

export default TextbookMainPage;
