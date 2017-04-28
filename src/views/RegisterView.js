import React, { Component } from "react";
import falcorModel from "../falcorModel";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { RegisterForm } from "../components/RegisterForm";
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
  async register(newUserModel) {
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
          <RegisterForm onSubmit={this.register} />
        </div>
        <div>{this.state.error}</div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
