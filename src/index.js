import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import 'semantic-ui-css/semantic.min.css';

import App from './components/App';
import configStore from './store';
import { loadState, saveState } from './utils/localStorage';

const persistedState = loadState();
const store = configStore(persistedState);

store.subscribe(() => {
  saveState({
    state: {
      auth: {
        code: null,
        accessToken: store.getState().state.auth.accessToken,
      }
    }
  });
});

render((
  <Provider store={store}>
    <App />
  </Provider>
),document.getElementById('root')
);