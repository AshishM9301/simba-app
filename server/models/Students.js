const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentName: {
    type: String,
  },
  studentSchool: {
    type: String,
  },
  studentSchoolId: {
    type: String,
  },
  studentAgentId: {
    type: String,
  },
  studentAgentName: {
    type: String,
  },
  documents: {
    type: String,
  },
  paid: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = { Student };
