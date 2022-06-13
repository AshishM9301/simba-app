const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  taskName: {
    type: String,
  },
  taskDescription: {
    type: String,
  },
  taskCategory: {
    type: String,
  },
  taskTime: {
    type: Date,
  },
  taskNotes: {
    type: String,
  },
  updateTime: {
    type: Date,
  },
  updateLogWithTime: {
    type: String,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
