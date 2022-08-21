import { Link, Outlet } from 'react-router-dom';
import classes from './GamesPage.module.css';

const GamesPage = (): JSX.Element => {
  return (
    <section className={classes.games}>
      <h1>GamesPage</h1>
      <ul>
        <li>
          <Link to='/games/audio'>Audio</Link>
        </li>

        <li>
          <Link to='/games/sprint'>Sprint</Link>
        </li>
      </ul>
      <Outlet />
    </section>
  );
};

export default GamesPage;
