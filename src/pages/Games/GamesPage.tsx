import { Link, Outlet } from 'react-router-dom';

import './GamesPage.pcss';

const GamesPage = (): JSX.Element => (
  <section className="games">
    <h1>GamesPage</h1>
    <ul>
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
