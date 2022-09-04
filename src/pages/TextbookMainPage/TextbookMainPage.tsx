// import { useSelector } from 'react-redux';
import { Outlet, Link } from '@tanstack/react-location';

import './TextbookMainPage.pcss';

// import { LocationGenerics } from '@/model/app-types';
// 6 groups, 30 pages, 20 words
const TextbookMainPage = (): JSX.Element => {
  //  const { data: { words: currentWords }, params:{ group, page } } = useMatch<LocationGenerics>();
  console.log('TextbookMainPage');
  // const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn);

  const START_PAGE = 0;
  const NUMBER_OF_GROUPS = 6;
  const groups = [...Array(NUMBER_OF_GROUPS).keys()];
  return (
    <section>
      <h1>TextbookMainPage</h1>
      <ul className="groups-list">
        {groups.map(gr => (
          <li key={gr}>
            <Link to={`/textbook/${gr}/${START_PAGE}`}>{gr + 1}</Link>
          </li>
        ))}
      </ul>

      <Outlet />
    </section>
  );
};

export default TextbookMainPage;
