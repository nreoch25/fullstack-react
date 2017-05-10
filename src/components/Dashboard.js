import React, { Component } from "react";
import Falcor from "falcor";
import falcorModel from "../falcorModel.js";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router";
const mapStateToProps = (state) => ({ ...state });
const mapDispatchToProps = (dispatch) => ({ });

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let articlesJSX = [];
    for(let articleKey in this.props.article) {
      let articleDetails = this.props.article[articleKey];
      let currentArticleJSX = (
        <div key={articleKey}>
          <ul className="list-group">
            <li className="list-group-item">{articleDetails.articleTitle}</li>
          </ul>
        </div>
      );
      articlesJSX.push(currentArticleJSX);
    }
    return(
      <div>
        <Link to="/add-article"><button type="button" className="btn btn-info">CREATE AN ARTICLE</button></Link>
        {articlesJSX}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
