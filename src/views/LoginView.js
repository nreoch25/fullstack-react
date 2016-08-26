import React, { Component } from "react";
import Falcor from "falcor";
import falcorModel from "../falcorModel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LoginForm } from "../components/LoginForm";
const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({ });

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
    this.login = this.login.bind(this);
  }
  async login(credentials) {
    console.info("credentials", credentials);
    let loginResult = await falcorModel.call(["login"], [credentials]).then((result) => {
      return result;
    });
    let tokenRes = await falcorModel.getValue("login.token");
    console.info("tokenRes", tokenRes);
    return;
  }
  render() {
    return (
      <div>
        <h1>Login View</h1>
        <div style={{maxWidth: 450, margin: "0 auto"}}>
          <LoginForm onSubmit={this.login} />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
