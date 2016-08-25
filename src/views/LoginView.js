import React, { Component } from "react";
import Falcor from "falcor";
import falcorModel from "../falcorModel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({ });

class LoginView extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Login View</h1>
        FORM GOES HERE
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
