// NOT USED
import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token: string, name: string) => {},
  logout: () => {},
  user: { name: '' },
});

export const AuthContextProvider = (props: React.PropsWithChildren): JSX.Element => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<{ name: string }>({ name: '' });
  const userIsLoggedIn = !!token;

  const loginHandler = (token: string, name: string) => {
    setToken(token);
    setUser({ name });
  };

  const logoutHandler = () => {
    setToken('');
    setUser({ name: '' });
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    user: user,
  };

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
