const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  courseName: {
    type: String,
  },
  keyFact: {
    type: String,
  },
  courseOverView: {
    type: String,
  },
  entryRequirement: {
    type: String,
  },
  fee: {
    type: String,
  },
  scholarShip: {
    type: String,
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = { Course };
