import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FormEvent, useRef, useState } from 'react';

import './AuthForm.pcss';

import * as api from '../../model/api';

import type { User } from '@/model/app-types';
import { authActions } from '@/store/authSlice';

const errorMessage = (status: number) =>
  status === 403 ? 'Incorrect e-mail or password' : 'Authentication Failed!';

const AuthForm = (): JSX.Element => {
  // TODO validation
  const [formIsLogin, setFormIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const switchAuthModeHandler = () => {
    setFormIsLogin(prevState => !prevState);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;

    if (!formIsLogin) {
      // SIGN UP
      const enteredName = nameInputRef.current!.value;
      const newUser: User = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };
      setIsLoading(true);
      api
        .registerUser(newUser)
        .then(res => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          }
          throw new Error();
        })
        .then((res: User) => {
          console.log('respond', res);
          // switch to Login Form to sign in
          switchAuthModeHandler();
        })
        .catch(err => console.error(err));
    } else {
      // SIGN IN
      const user = {
        email: enteredEmail,
        password: enteredPassword,
      };
      setIsLoading(true);
      api
        .signInUser(user)
        .then(res => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          }
          throw new Error(errorMessage(res.status));
        })
        .then((res: User) => {
          const token = res.token ? res.token : '';
          const name = res.name ? res.name : '';
          dispatch(authActions.login({ token, name }));
          navigate('/profile', { replace: true });
        })
        .catch(err => console.log(err));
    }
  };

  return (
    <section className="auth">
      <h2>{formIsLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={submitHandler}>
        {!formIsLogin && (
          <div className="control">
            <label htmlFor="name">
              Your Name
              <input ref={nameInputRef} type="text" id="name" required />
            </label>
          </div>
        )}
        <div className="control">
          <label htmlFor="email">
            Your Email
            <input ref={emailInputRef} type="email" id="email" required />
          </label>
        </div>
        <div className="control">
          <label htmlFor="password">
            Your Password
            <input ref={passwordInputRef} type="password" id="password" required minLength={5} />
          </label>
        </div>
        <div className="actions">
          {isLoading ? (
            <p>Sending Request ...</p>
          ) : (
            <button type="submit">{formIsLogin ? 'LogIn' : 'Sign Up'}</button>
          )}
          <button type="button" className="toggle" onClick={switchAuthModeHandler}>
            {formIsLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
