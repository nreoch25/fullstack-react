import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/fullstack", function(err) {
  if(err) { console.log("Not connected to mongo"); } else { console.log("Connected to mongo"); }
});
var articleSchema = {
  articleTitle:String,
  articleContent:String
};
var Article = mongoose.model("Article", articleSchema, "articles")

let PublishingAppRoutes = [
  {
    route: 'articles.length',
      get: () => {
        return Article.count({},
          function(err, count) {
            return count;
          }).then ((articlesCountInDB) => {
              return {
                path: ['articles', 'length'],
                value: articlesCountInDB
              }
            });
          }
  },
  {
    route: "articles[{integers}]['id', 'articleTitle', 'articleContent']",
    get: (pathSet) => {
      let articlesIndex = pathSet[1];
      return Article.find({},
        function(err, articlesDocs) {
          return articlesDocs;
        }).then((articlesArrayFromDB) => {
          let results = [];
          articlesIndex.forEach((index) => {
            let singleArticleObject = articlesArrayFromDB[index].toObject();
            let falcorSingleArticleResult = {
              path: ["articles", index],
              value: singleArticleObject
            };
            results.push(falcorSingleArticleResult);
          });
          return results;
        });
    }
  }
];

export default PublishingAppRoutes;
