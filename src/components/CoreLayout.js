import React, { Component } from "react";
import { Link } from "react-router";
import Header from "./Header";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import articleActions from "../actions/article.js";

const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class CoreLayout extends Component {
  static propTypes = {
    children: React.PropTypes.element
  }
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log(this.props);
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
export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout);
