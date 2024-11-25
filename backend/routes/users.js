var express = require("express");
var router = express.Router();
require("../models/connection");
const bcrypt = require("bcrypt");

const User = require("../models/users");
const { checkBody } = require("../modules/checkBody");

router.post("/signup", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields !" });
    return;
  }
  User.findOne({
    username: { $regex: new RegExp(req.body.username, "i") },
  }).then((data) => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash,
      });

      newUser.save().then((data) => {
        console.log(data);
        res.json({ result: true, data });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: "User already exists !" });
    }
  });
});

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["username", "password"])) {
    res.json({ result: false, error: "Missing or empty fields !" });
    return;
  }

  User.findOne({
    username: { $regex: new RegExp(req.body.username, "i") },
  }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, data });
    } else {
      res.json({ result: false, error: "User not found" });
    }
  });
});

router.post("/logout", (req, res) => {
  //console.log(req);
  //  res.clearCookie("jwt");
  res.json({ result: true });
});

/* GET users listing. 
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});*/

module.exports = router;
