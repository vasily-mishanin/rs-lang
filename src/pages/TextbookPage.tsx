import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const TextbookPage = (): JSX.Element => {
  const isLoggedIn = useSelector((state: RootState) => state.authentication.isLoggedIn);
  return (
    <section>
      <h1>TextbookPage</h1>
      {isLoggedIn && <Link to='dictionary'>Your Dictionary</Link>}
      <Outlet />
    </section>
  );
};

export default TextbookPage;
