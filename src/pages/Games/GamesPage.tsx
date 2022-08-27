import { Link, Outlet } from '@tanstack/react-location';

import './GamesPage.pcss';

const GamesPage = (): JSX.Element => (
  <section className="games">
    <ul className='games_list'>
      <li>
        <Link to="/games/audio">Audio</Link>
      </li>

      <li>
        <Link to="/games/sprint">Sprint</Link>
      </li>
    </ul>

    <Outlet />
  </section>
);

export default GamesPage;
