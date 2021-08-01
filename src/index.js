import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import configureStore from './store';
import { SW_INIT, SW_UPDATE } from './types';
import { RecipeProvider } from './components/RecipeContext';
import { ThemeProvider, GlobalStyle } from '@react95/core';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider>
      <GlobalStyle />
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();

serviceWorkerRegistration.register({
  onSuccess: () => store.dispatch({ type: SW_INIT }),
  onUpdate: (registration) =>
    store.dispatch({ type: SW_UPDATE, payload: registration }),
});
