import React, { Component } from "react";
import Falcor from "falcor";
import falcorModel from "../falcorModel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { LoginForm } from "../components/LoginForm";
import { Snackbar } from "material-ui";
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
  static contextTypes = {
    router: React.PropTypes.object
  }
  async login(credentials) {
    console.info("credentials", credentials);
    let loginResult = await falcorModel.call(["login"], [credentials]).then((result) => {
      return result;
    });
    let tokenRes = await falcorModel.getValue("login.token");
    console.info("tokenRes", tokenRes);
    if(tokenRes === "INVALID") {
      // login failed, get error message
      let errorRes = await falcorModel.getValue("login.error");
      this.setState({ error: errorRes });
      return;
    }
    if(tokenRes) {
      let username = await falcorModel.getValue("login.username");
      let role = await falcorModel.getValue("login.role");
      localStorage.setItem("token", tokenRes);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);
      this.context.router.push("/dashboard");
      return;
    } else {
      alert("Fatal login error, please contact an admin");
    }
    return;
  }
  render() {
    return (
      <div>
        <h1>Login View</h1>
        <div style={{maxWidth: 450, margin: "0 auto"}}>
          <LoginForm onSubmit={this.login} />
        </div>
        <Snackbar
          autoHideDuration={4000}
          open={!!this.state.error}
          message={this.state.error || ""}
          onRequestClose={() => console.info("you can add custom action here")} />
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
