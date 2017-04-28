import React, { Component } from "react";
import DefaultInput from "./DefaultInput";

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <h3>Registration form</h3>
        <DefaultInput onChange={(event) => {}} name="username" title="Username" required />
        <DefaultInput onChange={(event) => {}} name="firstName" title="Firstname" required />
        <DefaultInput onChange={(event) => {}} name="lastName" title="Lastname" required />
        <DefaultInput onChange={(event) => {}} name="email" title="Email" required />
        <DefaultInput onChange={(event) => {}} type="password" name="password" title="Password" required />
        <div style={{marginTop: 24}}>
          <button type="submit" style={{margin: "0 auto", display: "block", width: 150}} label={"Register"} />
        </div>
      </form>
    );
  }
}
