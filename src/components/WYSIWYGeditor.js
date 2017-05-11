import React, { Component } from "react";
import {
  Editor,
  EditorState,
  ContentState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import { BlockStyleControls, InlineStyleControls } from "./WYSIWYGbutton";

class WYSIWYGeditor extends Component {
  constructor(props) {
    super(props);
    let initialEditorFromProps = EditorState.createWithContent(ContentState.createFromText(""));
    this.state = {
      editorState: initialEditorFromProps
    };
    this.onChange = (editorState) => {
      var contentState = editorState.getCurrentContent();
      let contentJSON = convertToRaw(contentState);
      props.onChangeTextJSON(contentJSON, contentState);
      this.setState({editorState})
    };
    this.focus = () => this.refs["refWYSIWYGeditor"].focus();
    this.handleKeyCommand = (command) => this._handleKeyCommand(command);
    this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    this.toggleBlockType = (type) => this._toggleBlockType(type);
  }
  _toggleBlockType(blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _toggleInlineStyle(inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }
  _handleKeyCommand(command) {
    const {editorState} = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }
  render() {
    const { editorState } = this.state;
    let className = "RichEditor-editor";
    var contentState = editorState.getCurrentContent();
    return (
      <div>
        <h4>{this.props.title}</h4>
        <div className="RichEditor-root">
          <BlockStyleControls editorState={editorState} onToggle={this.toggleBlockType} />
          <InlineStyleControls editorState={editorState} onToggle={this.toggleInlineStyle} />
          <div className={className} onClick={this.focus}>
              <Editor editorState={editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange} ref="refWYSIWYGeditor" />
          </div>
        </div>
      </div>
    );
  }
}
export default WYSIWYGeditor;
