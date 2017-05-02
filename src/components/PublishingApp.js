import React, { Component } from "react";
import { connect } from "react-redux";
import falcorModel from "../falcorModel";
import { bindActionCreators } from "redux";
import articleActions from "../actions/article.js";
const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({
  articleActions: bindActionCreators(articleActions, dispatch)
});

class PublishingApp extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if(typeof window !== "undefined") { this._fetch(); }
  }
  async _fetch() {
    let articlesLength = await falcorModel.getValue("articles.length").then(function(length) {
      return length;
    });
    let articles = await falcorModel.get(["articles", {from: 0, to: articlesLength -1},
    ["_id", "articleTitle", "articleContent"]]).then(function(articlesResponse) {
      return articlesResponse.json.articles;
    });
    this.props.articleActions.articlesList(articles);
  }
  render () {
    let articlesJSX = [];
    for(let articleKey in this.props.article) {
      let articleDetails = this.props.article[articleKey];
      let currentArticleJSX = (
        <div key={articleKey}>
        <h2>{articleDetails.articleTitle}</h2>
        <h3>{articleDetails.articleContent}</h3>
        </div>
      );
      articlesJSX.push(currentArticleJSX);
    }
    return (
      <div>
        {articlesJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PublishingApp);
