import http from "http";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/fullstack", function(err) {
  if(err) { console.log("Not connected to mongo"); } else { console.log("Connected to mongo"); }
});
var articleSchema = {
  articleTitle:String,
  articleContent:String
};
var Article = mongoose.model("Article", articleSchema, "articles")
var app = express();
app.server = http.createServer(app);
// CORS - 3rd party middleware
app.use(cors());
// This is required by falcor-express middleware to work correctly
app.use(bodyParser.json({extended: false}));
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
