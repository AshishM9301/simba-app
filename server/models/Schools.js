const mongoose = require("mongoose");

const schoolSchema = mongoose.Schema({
  schoolName: {
    type: String,
  },
  schoolCountry: {
    type: String,
  },
  schoolProvidence: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  campus: {
    type: String,
  },
  pocName: {
    type: String,
  },
  pocNumber: {
    type: Number,
  },
  pocEmail: {
    type: String,
  },
  pocRole: {
    type: String,
  },
  courses: [
    {
      courseId: {
        type: String,
      },
      courseName: {
        type: String,
      },
    },
  ],
});

const SchoolSchema = mongoose.model("School", schoolSchema);

module.exports = { SchoolSchema };
