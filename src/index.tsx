import { createRoot } from 'react-dom/client';

import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { AuthContextProvider } from './store/auth-context';

import { store } from './store/store';
import { Provider } from 'react-redux';

import App from '@/App';
import './index.css';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <StrictMode>
    <Provider store={store}>
      {/* <AuthContextProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </AuthContextProvider> */}
    </Provider>
  </StrictMode>
);
