import React, { Component } from "react";
import Falcor from "falcor";
import falcorModel from "../falcorModel.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({ });

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div>
        <h1>Dashboard - loggedin!</h1>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
