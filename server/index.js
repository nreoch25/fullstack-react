import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import falcor from "falcor";
import falcorExpress from "falcor-express";
import Router from "falcor-router";
import routes from "./routes";

import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { renderToStaticMarkup } from "react-dom/server";
import createLocation from 'history/lib/createLocation';
import ReactRouter from "react-router";
import { RouterContext, match } from "react-router";
import rootReducer from "../src/reducers";
import reactRoutes from "../src/routes";
import fetchServerSide from "./fetchServerSide";

var app = express();
app.server = http.createServer(app);
// CORS - 3rd party middleware
app.use(cors());
// This is required by falcor-express middleware to work correctly
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
app.use("/model.json", falcorExpress.dataSourceRoute(function(req, res) {
  return new Router(routes);
}));
let handleServerSideRender = (req, res) => {
  let initMOCKstore = fetchServerSide();
  // mocked for now // Create a Redux store instance
  const store = createStore(rootReducer, initMOCKstore);
  const location = createLocation(req.url);
  match({ routes: reactRoutes, location }, (err, redirectLocation, renderProps) => {
    console.log(renderProps);
    if(redirectLocation) {
      res.redirect(301, redirectLocation.pathname = redirectLocation.search);
    } else if(err) {
      console.log(err);
      next(err); // res.send(500, err.message);
    } else if(renderProps === null) {
      res.status(404).send("Not Found");
    } else {
      let html = renderToStaticMarkup(
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );
      const initialState = store.getState();
      let fullHTML = renderFullPage(html, initialState);
      res.send(fullHTML)
    }
  });
};
let renderFullPage = (html, initialState) => {
  return `
    <!doctype html>
    <html>
      <head>
        <title>Publishing App Server Side Rendering</title>
      </head>
      <body>
        <h1>Server side publishing app</h1>
        <div id="publishingAppRoot">${html}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
        <script src="/static/app.js"></script>
      </body>
    </html> `
};
app.use(handleServerSideRender);
app.use("/static", express.static("dist"));
app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);
export default app;
