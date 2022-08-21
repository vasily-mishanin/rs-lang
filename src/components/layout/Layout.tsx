import React, { Fragment } from 'react';
import MainNavigation from './MainNavigation';

const Layout = (props: React.PropsWithChildren): JSX.Element => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};
export default Layout;
