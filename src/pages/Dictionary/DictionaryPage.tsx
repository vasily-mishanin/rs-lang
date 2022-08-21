import { NavLink, Outlet } from 'react-router-dom';

const DictionaryPage = (): JSX.Element => {
  return (
    <section>
      <h1>DictionaryPage</h1>
      <nav>
        <ul>
          <li>
            <NavLink to='difficult'>Difficult Words</NavLink>
          </li>
          <li>
            <NavLink to='learned'>Learned Words</NavLink>
          </li>
          <li>
            <NavLink to='progress'>Progress</NavLink>
          </li>
          <li>
            <NavLink to='statistics'>Statistics</NavLink>
          </li>
        </ul>
      </nav>
      <Outlet />
    </section>
  );
};
export default DictionaryPage;
