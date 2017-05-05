import React, { Component } from "react";

class ArticleCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let title = this.props.title || "no title provided";
    let content = this.props.content || "no content provided";
    return (
      <div>
        <div className="well well-lg">
          <h2>{title}</h2>

          <h5>Subtitle</h5>
          
          <div>{content}</div>
        </div>
      </div>
    );
  }
}

export default ArticleCard;
