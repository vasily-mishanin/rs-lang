import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';

type AuthUser = {
  name:string;
};

export interface AuthState {
  token: string;
  isLoggedIn: boolean;
  user: AuthUser;
};

const retrieveUser = ():{name:string} => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    return JSON.parse(storedUser) as AuthUser;
  }
  return { name: '' };
};

const initialState: AuthState = {
  token: localStorage.getItem('token') || '',
  isLoggedIn: !!localStorage.getItem('token'),
  user: retrieveUser(),
};

export const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; name: string }>) => {
      state.token = action.payload.token;
      state.isLoggedIn = !!action.payload.token;
      state.user.name = action.payload.name;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify({ name: action.payload.name }));
    },
    logout: state => {
      state.token = '';
      state.isLoggedIn = false;
      state.user.name = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const authActions = authSlice.actions; // for subscriber (AuthForm, ...)

export default authSlice; // for store
