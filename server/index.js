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
import ReactRouter from "react-router";
import { RouterContext, match } from "react-router";
import * as hist from "history";
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
app.use(express.static("dist"));
app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);
export default app;
