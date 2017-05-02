import configMongoose from './configMongoose';
const Article = configMongoose.Article;

export default () => {
  return Article.find({}, function(err, articlesDocs) {
    return articlesDocs;
  }).then ((articlesArrayFromDB) => {
    return articlesArrayFromDB;
  });
}
