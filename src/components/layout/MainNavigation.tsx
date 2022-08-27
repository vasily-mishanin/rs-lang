import { Link, useNavigate } from '@tanstack/react-location';
import { useSelector, useDispatch } from 'react-redux';

import React from 'react';

import './MainNavigation.pcss';

import { authActions } from '@/store/authSlice';
import { RootState } from '@/store/store';

const MainNavigation = ({ children }:React.PropsWithChildren): JSX.Element => {
  console.log('MainNavigation');
  const authState = useSelector((state: RootState) => state.authentication);
  const { isLoggedIn } = authState;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate({ to:'/', replace:true });
    window.location.reload(); // bad
  };

  const getActiveProps = () => ({
    style: { color: 'rgb(120 53 15)' },
  });

  return (
    <>
      <header className="header">

        <Link to="/" getActiveProps={getActiveProps}>
          <div className="logo">RS Lang</div>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/" getActiveProps={getActiveProps}>
              Home
              </Link>
            </li>
            <li>
              <Link to="/team" getActiveProps={getActiveProps}>
              Team{' '}
              </Link>
            </li>
            <li>
              <Link to="/textbook" getActiveProps={getActiveProps}>
              Textbook
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/dictionary" getActiveProps={getActiveProps}>
                Dictionary
                </Link>
              </li>
            )}
            <li>
              <Link to="/games" getActiveProps={getActiveProps}>
              Games
              </Link>
            </li>
            {!isLoggedIn && (
              <li>
                <Link to="/auth" getActiveProps={getActiveProps}>
                Login|SignUp
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link to="/profile" getActiveProps={getActiveProps}>
                Profile {authState.user.name}
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button type="button" onClick={logoutHandler}>
                Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
      {children}

    </>
  );
};

export default MainNavigation;
