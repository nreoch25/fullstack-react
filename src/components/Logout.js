import React, { Component } from "react";

class Logout extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (typeof localStorage !== "undefined" && localStorage.token) {
      delete localStorage.token;
      delete localStorage.username;
      delete localStorage.role;
    }
  }
  render() {
    return(
      <div className="well well-lg">
        <h2>Logout Successful</h2>
      </div>
    )
  }
}

  export default Logout;
