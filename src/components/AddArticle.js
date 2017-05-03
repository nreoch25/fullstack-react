import React, { Component } from "react";
import {connect} from "react-redux";
import WYSIWYGeditor from "./WYSIWYGeditor.js";
const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({});

class AddArticle extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="well well-lg">
        <h1>Add Article</h1>
        <WYSIWYGeditor />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
