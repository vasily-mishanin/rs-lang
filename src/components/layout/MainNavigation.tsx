import { NavLink, Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
//import AuthContext from '@/store/auth-context';
//import { useContext } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { authActions } from '@/store/authSlice';

const MainNavigation = (): JSX.Element => {
  //const authCtx = useContext(AuthContext);
  //const isLoggedIn = authCtx.isLoggedIn;

  const authState = useSelector((state: RootState) => state.authentication);
  const isLoggedIn = authState.isLoggedIn;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    //authCtx.logout();
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>RS Lang</div>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/textbook'>Textbook</NavLink>
          </li>
          <li>
            <NavLink to='/games'>Games</NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink to='/auth'>Login|SignUp</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink to='/profile'>Profile {authState.user.name}</NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
