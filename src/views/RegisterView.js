import React, { Component } from "react";
import falcorModel from "../falcorModel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const mapStateToProps = ( state ) => ({ ...state });
const mapDispatchToProps = ( dispatch ) => ({ });

class RegisterView extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.register = this.register.bind(this);
  }
  static contextTypes = {
    router: React.PropTypes.object
  }
  async register(evt) {
    evt.preventDefault()
    let newUserModel = {
      username: this.refs.username.value,
      firstName: this.refs.firstname.value,
      lastName: this.refs.lastname.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    };
    console.info("newUserModel", newUserModel);
    let registerResult = await falcorModel.call(["register"], [newUserModel]).then((result) => {
      return result;
    });
    let newUserId = await falcorModel.getValue(["register", "newUserId"]);
    if(newUserId === "INVALID") {
      let errorRes = await falcorModel.getValue("register.error");
      this.setState({ error: errorRes });
      return;
    }
    if(newUserId) {
      this.context.router.push("/login");
      return;
    } else {
      this.setState({ error: "Fatal registration error, please contact an admin" });
    }
  }
  render() {
    return(
      <div>
        <h1>Register</h1>
        <div style={{maxWidth: 450, margin: "0 auto"}}>
          <form onSubmit={this.register}>
            <input ref="username" name="username" title="Username" required />
            <input ref="firstname" name="firstName" title="Firstname" required />
            <input ref="lastname" name="lastName" title="Lastname" required />
            <input ref="email" name="email" title="Email" required />
            <input ref="password" type="password" name="password" title="Password" required />
            <div style={{marginTop: 24}}>
              <button type="submit" style={{margin: "0 auto", display: "block", width: 150}} />
            </div>
          </form>
        </div>
        <div>{this.state.error}</div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
