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
    this.state = {
      error: null
    }
    this.login = this.login.bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  async login(evt) {
    evt.preventDefault()
    let credentials = { username: this.refs.username.value, password: this.refs.password.value };
    console.log(credentials);
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
      <form className="form-horizontal" onSubmit={this.login}>
        <div className="form-group" style={{"padding": "0 15px"}}>
          <label className="control-label" for="username">Username:</label>
          <input className="form-control" ref="username" name="username" title="Username" required />
        </div>
        <div className="form-group" style={{"padding": "0 15px"}}>
          <label className="control-label" for="password">Password:</label>
          <input className="form-control" ref="password" type="password" name="password" title="Password" required />
        </div>
        <div className="form-group" style={{"padding": "0 15px"}}>
          <button type="submit" className="btn btn-default">Submit</button>
        </div>
        <div>{this.state.error}</div>
      </form>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
