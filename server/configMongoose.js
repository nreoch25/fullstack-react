import mongoose from "mongoose";
mongoose.Promise = global.Promise;
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
  username: { type: String, index: { unique: true, dropDups: true}},
  password: String,
  firstName: String,
  lastName: String,
  email: { type: String, index: { unique: true, dropDups: true }},
  role: { type: String, default: "editor" },
  verified: Boolean,
  imageUrl: String
}
var Article = mongoose.model("Article", articleSchema, "articles");
var User = mongoose.model("User", userSchema, "pubUsers");
export default { Article, User };
