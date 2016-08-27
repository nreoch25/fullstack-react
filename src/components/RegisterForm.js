import React, { Component } from "react";
import Formsy from "formsy-react";
import { RaisedButton, Paper, baseTheme } from "material-ui";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import DefaultInput from "./DefaultInput";
import injectTapEventPlugin from 'react-tap-event-plugin';

export class RegisterForm extends Component {
  constructor(props) {
    super(props);
  }
  getChildContext() {
    return { muiTheme: getMuiTheme(baseTheme) };
  }
  render() {
    return (
      <Formsy.Form onSubmit={this.props.onSubmit}>
        <Paper zDepth={1} style={{padding: 32}}>
          <h3>Registration form</h3>
          <DefaultInput onChange={(event) => {}} name="username" title="Username" required />
          <DefaultInput onChange={(event) => {}} name="firstName" title="Firstname" required />
          <DefaultInput onChange={(event) => {}} name="lastName" title="Lastname" required />
          <DefaultInput onChange={(event) => {}} name="email" title="Email" required />
          <DefaultInput onChange={(event) => {}} type="password" name="password" title="Password" required />
          <div style={{marginTop: 24}}>
            <RaisedButton secondary={true} type="submit" style={{margin: "0 auto", display: "block", width: 150}} label={"Register"} />
          </div>
        </Paper>
      </Formsy.Form>
    );
  }
}
RegisterForm.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
};
