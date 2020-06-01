import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import { SW_INIT, SW_UPDATE } from './types';
import { RecipeProvider } from './components/RecipeContext';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <RecipeProvider>
      <App />
    </RecipeProvider>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.register({
  onSuccess: () => store.dispatch({ type: SW_INIT }),
  onUpdate: (registration) =>
    store.dispatch({ type: SW_UPDATE, payload: registration }),
});
