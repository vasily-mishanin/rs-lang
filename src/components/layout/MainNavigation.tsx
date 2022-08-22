import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import './MainNavigation.pcss';

import { authActions } from '@/store/authSlice';
import { RootState } from '@/store/store';

const MainNavigation = (): JSX.Element => {

  const authState = useSelector((state: RootState) => state.authentication);
  const { isLoggedIn } = authState;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className='header'>
      <Link to="/">
        <div className='logo'>RS Lang</div>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/textbook">Textbook</NavLink>
          </li>
          <li>
            <NavLink to="/games">Games</NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink to="/auth">Login|SignUp</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to="/profile">Profile {authState.user.name}</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button type='button' onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
