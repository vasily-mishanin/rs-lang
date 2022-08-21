import Layout from './components/layout/Layout';
import { Routes, Route, Navigate } from 'react-router-dom';
//import AuthContext from './store/auth-context';
//import { useContext } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

import HomePage from './pages/HomePage';

import TextbookPage from './pages/TextbookPage';
import DictionaryPage from './pages/Dictionary/DictionaryPage';
import DifficultWords from './pages/Dictionary/DifficultWords';
import LearnedWords from './pages/Dictionary/LearnedWords';
import Progress from './pages/Dictionary/Progress';
import Statistics from './pages/Dictionary/Statistics';

import GamesPage from './pages/Games/GamesPage';
import GameAudio from './pages/Games/GameAudio';
import GameSprint from './pages/Games/GameSprint';

import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';

const App = (): JSX.Element => {
  //const authCtx = useContext(AuthContext);
  const authState = useSelector((state: RootState) => state.authentication);
  const { isLoggedIn, token, user } = authState;
  console.log('APP', 'isLoggedIn', isLoggedIn, user);
  console.log('token:', token);

  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/textbook' element={<TextbookPage />}>
          <Route path='dictionary' element={isLoggedIn ? <DictionaryPage /> : <Navigate to='/textbook' />}>
            <Route path='difficult' element={<DifficultWords />} />
            <Route path='learned' element={<LearnedWords />} />
            <Route path='progress' element={<Progress />} />
            <Route path='statistics' element={<Statistics />} />
          </Route>
        </Route>
        <Route path='/games' element={<GamesPage />}>
          <Route path='audio' element={<GameAudio />} />
          <Route path='sprint' element={<GameSprint />} />
        </Route>
        <Route path='/auth' element={!isLoggedIn ? <AuthPage /> : <Navigate to='/profile' />} />
        <Route path='/profile' element={isLoggedIn ? <ProfilePage /> : <Navigate to='/auth' />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Layout>
  );
};
export default App;
