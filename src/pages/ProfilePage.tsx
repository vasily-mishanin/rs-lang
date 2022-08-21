//import AuthContext from '@/store/auth-context';
//import { useContext } from 'react';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

const ProfilePage = (): JSX.Element => {
  //const authCtx = useContext(AuthContext);
  console.log('PROFILE');

  const authState = useSelector((state: RootState) => state.authentication);

  return (
    <section>
      <h1>ProfilePage</h1>
      <h2>Hi! {authState.user.name}</h2>
    </section>
  );
};

export default ProfilePage;
