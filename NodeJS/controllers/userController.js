const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { User } = require("../models/user");

// localhost:3000/users
router.get("/", (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in retriving users: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

// localhost:3000/users/login?username=asd&password=asd
router.get("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  User.findOne({ username: username, password: password }, (err, docs) => {
    if (docs === null) {
      return res.json(null);
    } else {
      return res.json(docs);
    }
  });
});

// localhost:3000/users/6293ca28d1da31221a0800e5
router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id:  ${req.params.id}`);
  }

  User.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in retriving user: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", (req, res) => {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in user save: " + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id:  ${req.params.id}`);
  }

  var user = {
    username: req.body.username,
    password: req.body.password,
  };

  User.findByIdAndUpdate(
    req.params.id,
    { $set: user },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in user update: " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No user with given id:  ${req.params.id}`);
  }

  User.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in user delete: " + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
