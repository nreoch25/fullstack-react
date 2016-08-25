import React from "react";
import { render } from "react-dom";
import { browserHistory } from "react-router";
import Root from "./containers/Root";
import configureStore from "./store/configureStore";
const target = document.getElementById("publishingAppRoot");
const history = browserHistory;
const store = configureStore(window.__INITIAL_STATE__);
const node = (
  <Root history={history} store={store} />
)
render(node, target);
