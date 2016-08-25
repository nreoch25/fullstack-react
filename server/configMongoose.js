import mongoose from "mongoose";
const conf = {
  hostname: process.env.MONGO_HOSTNAME || "localhost",
  port: process.env.MONGO_PORT || 27017,
  env: process.env.MONGO_ENV || "fullstack"
};
mongoose.connect(`mongodb://${conf.hostname}:${conf.port}/${conf.env}`, function(err) {
  if(err) { console.log("Not connected to mongo"); } else { console.log("Connected to mongo"); }
});
var articleSchema = {
  articleTitle:String,
  articleContent:String
};
var userSchema = {
  "username": String,
  "password": String,
  "firstName": String,
  "lastName": String,
  "email": String,
  "role": String,
  "verified": Boolean,
  "imageUrl": String
}
var Article = mongoose.model("Article", articleSchema, "articles");
var User = mongoose.model("User", userSchema, "pubUsers");
export default { Article, User };
