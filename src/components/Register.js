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
      <form className="form-horizontal" onSubmit={this.register}>
        <div className="form-group" style={{"padding": "0 15px"}}>
          <label className="control-label" for="username">Username:</label>
          <input className="form-control" ref="username" name="username" title="Username" required />
        </div>
        <div className="form-group" style={{"padding": "0 15px"}}>
          <label className="control-label" for="firstname">FirstName:</label>
          <input className="form-control" ref="firstname" name="firstName" title="Firstname" required />
        </div>
        <div className="form-group" style={{"padding": "0 15px"}}>
          <label className="control-label" for="lastname">LastName:</label>
          <input className="form-control" ref="lastname" name="lastName" title="Lastname" required />
        </div>
        <div className="form-group" style={{"padding": "0 15px"}}>
          <label className="control-label" for="email">Email:</label>
          <input className="form-control" ref="email" name="email" title="Email" required />
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
