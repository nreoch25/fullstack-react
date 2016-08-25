import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import falcor from "falcor";
import falcorExpress from "falcor-express";
import Router from "falcor-router";
import routes from "./routes";

var app = express();
app.server = http.createServer(app);
// CORS - 3rd party middleware
app.use(cors());
// This is required by falcor-express middleware to work correctly
app.use(bodyParser.json({extended: false}));
app.use(bodyParser.urlencoded({extended: false}));
let cache = {
  articles: [
    {
      id: 987654,
      articleTitle: "Lorem ipsum - article one",
      articleContent: "Here goes the content of the article"
    },
    {
      id: 123456,
      articleTitle: "Lorem ipsum - article two from backend",
      articleContent: "Sky is the limit, the content goes here."
    }
  ]
};
var model = new falcor.Model({ cache: cache });
app.use("/model.json", falcorExpress.dataSourceRoute(function(req, res) {
  return new Router(routes);
}));
app.use(express.static("dist"));
app.get("/", (req, res) => {
  Article.find(function(err, articleDocs) {
    if(err) {
      res.send(err);
    } else {
      let ourArticles = articleDocs.map(function(item) {
        return `<h2>${item.articleTitle}</h2>${item.articleContent}`;
      }).join("<br />");
      res.send(`<h1>Publishing App Initial Application!</h1> ${ourArticles}`);
    }
  });
});
app.server.listen(process.env.PORT || 3000);
console.log(`Started on port ${app.server.address().port}`);
export default app;
