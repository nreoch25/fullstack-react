import mapHelpers from "../utils/mapHelpers";

const article = (state = {}, action) => {
  switch(action.type) {
    case "RETURN_ALL_ARTICLES":
      return Object.assign({}, state);
    case "ARTICLES_LIST_ADD":
      let articlesList = action.payload.response;
      // TODO use map helpers
      return Object.assign({}, action.payload.response);
    case "PUSH_NEW_ARTICLE":
      let newArticleObject = action.payload.response;
      return mapHelpers.addItem(state, newArticleObject["_id"], newArticleObject);
    default:
      return state;
  }
}

export default article;
