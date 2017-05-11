import React, { Component } from "react";
import {connect} from "react-redux";
import { stateToHTML } from "draft-js-export-html";
import WYSIWYGeditor from "./WYSIWYGeditor.js";
const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({});

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this._onDraftJSChange = this._onDraftJSChange.bind(this);
    this.state = {
      contentJSON: {},
      htmlContent: ""
    };
  }
  _onDraftJSChange(contentJSON, contentState) {
    let htmlContent = stateToHTML(contentState);
    this.setState({contentJSON, htmlContent});
  }
  render () {
    return (
      <div className="well well-lg">
        <WYSIWYGeditor initialValue="" title="Create an article" onChangeTextJSON={this._onDraftJSChange}/>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddArticle);
