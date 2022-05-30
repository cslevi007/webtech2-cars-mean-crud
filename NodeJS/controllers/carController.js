const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { Car } = require("../models/car");

// localhost:3000/cars/
router.get("/", (req, res) => {
  Car.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in retriving cars: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

// localhost:3000/cars/62937e3218eda07e03621f7b
router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id:  ${req.params.id}`);
  }

  Car.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in retriving car: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", (req, res) => {
  var car = new Car({
    licensePlateNumber: req.body.licensePlateNumber,
    brand: req.body.brand,
    type: req.body.type,
    fuel: req.body.fuel,
    consumption: req.body.consumption,
    odo: req.body.odo,
  });

  car.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in car save: " + JSON.stringify(err, undefined, 2));
    }
  });
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No record with given id:  ${req.params.id}`);
  }

  var car = {
    licensePlateNumber: req.body.licensePlateNumber,
    brand: req.body.brand,
    type: req.body.type,
    fuel: req.body.fuel,
    consumption: req.body.consumption,
    odo: req.body.odo,
  };

  Car.findByIdAndUpdate(
    req.params.id,
    { $set: car },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in car update: " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send(`No car with given id:  ${req.params.id}`);
  }

  Car.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in car delete: " + JSON.stringify(err, undefined, 2));
    }
  });
});

module.exports = router;
