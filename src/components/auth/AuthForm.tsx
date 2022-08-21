import { FormEvent, useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './AuthForm.module.css';

const API_ENDPOINT = 'http://rss-rs-lang.herokuapp.com';

//import AuthContext from '@/store/auth-context';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/store/store';
import { authActions } from '@/store/authSlice';

const AuthForm = (): JSX.Element => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  console.log('isLogin', isLogin);

  const navigate = useNavigate();
  //const authCtx = useContext(AuthContext);

  const authState = useSelector((state: RootState) => state.authentication);
  const dispatch = useDispatch();

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    console.log('submitHandler');
    let enteredName: string = '';
    if (!isLogin) {
      enteredName = nameInputRef.current!.value;
    }
    const enteredEmail = emailInputRef.current!.value;
    const enteredPassword = passwordInputRef.current!.value;
    let url;
    let user;

    if (!isLogin) {
      // sign Up
      url = `${API_ENDPOINT}/users`;
      user = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
      };
    } else {
      //sign In
      url = `${API_ENDPOINT}/signin`;
      user = {
        email: enteredEmail,
        password: enteredPassword,
      };
    }
    console.log('user', user);

    setIsLoading(true);
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = data?.error?.message ? data.error.message : 'Authentication Failed!';
            console.log(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log('respond', data);
        if (!isLogin) {
          //if it was sign UP switch to Login Form to sign in
          switchAuthModeHandler();
        } else {
          // if it was sign IN  user -> navigate to Profile
          //authCtx.login(data.token, data.name);
          dispatch(authActions.login({ token: data.token, name: data.name }));
          navigate('/profile', { replace: true });
        }
      })
      .catch((err) => alert(err));
  };

  return (
    <section className={classes.auth}>
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameInputRef} type='text' id='name' required />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input ref={emailInputRef} type='email' id='email' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input ref={passwordInputRef} type='password' id='password' required minLength={5} />
        </div>
        <div className={classes.actions}>
          {isLoading ? <p>Sending Request ...</p> : <button>{isLogin ? 'LogIn' : 'Sign Up'}</button>}
          <button type='button' className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};
export default AuthForm;
