import React, { Component } from "react";
import Header from "./Header";
class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element
  }
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{"marginTop": "60px"}}>
        <Header route={this.props.routes[1].name}/>
        {this.props.children}
      </div>
    );
  }
}
export default CoreLayout;
