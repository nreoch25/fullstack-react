import React, { Component } from "react";
import { Link } from "react-router";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  getNavigationLinks() {
    let userIsLoggedIn = (typeof localStorage !== "undefined" && localStorage.token && this.props.route !== "logout") ? true : false;
    console.log("USER LOGGED IN", userIsLoggedIn);
    // TODO display dashboard / logout if logged in
  }
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
              {this.getNavigationLinks()}
              <li id="nav-saved"><Link to="/register"><span className="glyphicon glyphicon-saved right-margin"></span> Register</Link></li>
              <li id="nav-request"><Link to="/login"><span className="glyphicon glyphicon-log-in right-margin"></span> Login</Link></li>
            </ul>
            </div>
        </div>
      </nav>
    );
  }
}

export default Header;
