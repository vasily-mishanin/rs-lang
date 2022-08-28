import { Link, Outlet } from '@tanstack/react-location';

const DictionaryPage = (): JSX.Element => (
  <section>
    <h1>DictionaryPage</h1>
    <nav>
      <ul>
        <li>
          <Link to="difficult">Difficult Words</Link>
        </li>
        <li>
          <Link to="learned">Learned Words</Link>
        </li>
        <li>
          <Link to="progress">Progress</Link>
        </li>
        <li>
          <Link to="statistics">Statistics</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </section>
);
export default DictionaryPage;
