import React from "react";
import { Route, IndexRoute } from "react-router";
import CoreLayout from "../components/Corelayout";
import PublishingApp from "../components/PublishingApp";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Dashboard from "../components/Dashboard";
import Register from "../components/Register";
import AddArticle from "../components/AddArticle";

export default (
  <Route component={CoreLayout} path="/">
    <IndexRoute component={PublishingApp} name="home" />
    <Route component={Login} path="login" name="login" />
    <Route component={Logout} path="logout" name="logout" />
    <Route component={Dashboard} path="dashboard" name="dashboard" />
    <Route component={Register} path="register" name="register" />
    <Route component={AddArticle} path="add-article" name="add-article" />
  </Route>
);
