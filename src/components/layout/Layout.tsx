import React from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props: React.PropsWithChildren): JSX.Element => {
  const { children } = props;
  return <>
    <MainNavigation />
    <main>{children}</main>
  </>;
};

export default Layout;
