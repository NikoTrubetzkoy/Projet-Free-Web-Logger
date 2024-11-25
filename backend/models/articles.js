const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  public: Boolean,
  postedOn: String,
});

const Article = mongoose.model("articles", articleSchema);

module.exports = Article;
