import React, { Component } from "react";
import { Link } from "react-router";

export default class Header extends Component {
  render() {
    return(
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="/" className="navbar-brand">Publishing App</Link>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav navbar-right">
              <li id="nav-saved"><Link to="/register"><span className="glyphicon glyphicon-saved right-margin"></span> Register</Link></li>
              <li id="nav-request"><Link to="/login"><span className="glyphicon glyphicon-log-in right-margin"></span> Login</Link></li>
            </ul>
            </div>
        </div>
      </nav>
    );
  }
}
