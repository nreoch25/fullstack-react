import React, { Component } from "react";
import { TextField } from "material-ui";
import { HOC } from "formsy-react";

class DefaultInput extends Component {
  constructor(props) {
    super(props);
    this.changeValue = this.changeValue.bind(this);
    this.state = { currentText: "" };
  }
  changeValue(evt) {
    this.setState({currentText: evt.target.value});
    this.props.setValue(evt.target.value);
    this.props.onChange(evt);
  }
  render() {
    return(
      <div>
        <TextField ref={this.props.name}
          floatingLabelText={this.props.title}
          name={this.props.name}
          onChange={this.changeValue}
          required={this.props.required}
          type={this.props.type}
          value={this.state.currentText} />
        {this.props.children}
      </div>
    );
  }
}

export default HOC(DefaultInput);
