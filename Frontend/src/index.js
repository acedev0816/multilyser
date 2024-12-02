import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import store from './redux/store'
import { Provider } from 'react-redux'
import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: 'GTM-MZH25F9C', // Replace with your GTM Container ID
};

TagManager.initialize(tagManagerArgs)


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
