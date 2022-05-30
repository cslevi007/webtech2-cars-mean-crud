const mongoose = require("mongoose");

var Car = mongoose.model("Car", {
  licensePlateNumber: { type: String },
  brand: { type: String },
  type: { type: String },
  fuel: { type: String },
  consumption: { type: Number },
  odo: { type: Number },
});

module.exports = {
  Car,
};
