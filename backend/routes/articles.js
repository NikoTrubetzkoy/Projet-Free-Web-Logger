var express = require("express");
var router = express.Router();
require("../models/connection");

const Article = require("../models/articles");
const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

//console.log("ARTICLE ROUTE CONTACTED");

router.post("/record", (req, res) => {
  if (!checkBody(req.body, ["user", "log"])) {
    res.json({ result: false, error: "Missing some crucial data !" });
    return;
  }

  console.log("RECEIVED REQUEST", req.body.title);

  Article.findOne({
    title: { $regex: new RegExp(req.body.title) },
  }).then((sameTitle) => {
    if (sameTitle === null) {
      var authorId = "";

      User.findOne({ username: req.body.user }).then((user) => {
        console.log("USER LOOKUP <<<<<<<<<");
        if (user === null) {
          res.json({ result: false, error: "User not found" });
          return;
        } else {
          authorId = user.id;
          console.log("LOOKUP STATUS : ", user._id, authorId);
        }
        console.log("AUTHOR_ID :", authorId);

        const newArticle = new Article({
          title: req.body.title,
          content: req.body.log,
          author: authorId,
          public: req.body.public,
          postedOn: req.body.dateStamp,
        });

        newArticle.save().then((articleData) => {
          console.log(articleData);
          res.json({ result: true, articleData });
        });
      });
    } else {
      res.json({ result: false, error: "Un article a déjà ce nom." });
    }
  });
});

router.get("/", (req, res) => {
  Article.find({ public: true }).then((articlesToPublish) => {
    res.json({ result: true, articlesToPublish });
  });
});

module.exports = router;
