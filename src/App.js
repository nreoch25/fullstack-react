import React from "react";
import { render } from "react-dom";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from 'react-router-redux';
import Root from "./components/Root";
import configureStore from "./store/configureStore";
const target = document.getElementById("publishingAppRoot");
const store = configureStore(window.__INITIAL_STATE__);
const history = syncHistoryWithStore(browserHistory, store);
const node = (
  <Root history={history} store={store} />
)
render(node, target);
