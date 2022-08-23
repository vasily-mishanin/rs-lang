// import { useSelector } from 'react-redux';
import { Outlet, Link } from 'react-router-dom';

import './TextbookMainPage.pcss';

// import { useState } from 'react';

// import type { RootState } from '@/store/store';
// 6 groups, 30 pages, 20 words
const TextbookMainPage = (): JSX.Element => {
  console.log('TextbookMainPage');
  // const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn);

  const START_PAGE = 0;
  const NUMBER_OF_GROUPS = 6;
  const groups = [...Array(NUMBER_OF_GROUPS).keys()];
  return (
    <section>
      <h1>TextbookMainPage</h1>
      <ul className="groups-list">
        {groups.map(group => (
          <li key={group}>
            <Link to={`/textbook/${group}/${START_PAGE}`}>{group + 1}</Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </section>
  );
};

export default TextbookMainPage;
