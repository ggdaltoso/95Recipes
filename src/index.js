import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store";
import { SW_INIT, SW_UPDATE } from "./types";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register({
  onSuccess: () => {
    store.dispatch({ type: SW_INIT });
  },
  onUpdate: registration => {
    console.log("There is a new version");
    store.dispatch({ type: SW_UPDATE, payload: registration });
  }
});
