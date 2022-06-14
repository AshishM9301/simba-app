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
  taskCreatedBy: {
    type: String,
  },
  taskAssignedTo: [
    {
      userId: {
        type: String,
      },
      userName: {
        type: String,
      },
    },
  ],
  updateLogWithTime: [
    {
      log: {
        type: String,
      },
      created_at: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

const Task = mongoose.model("Task", taskSchema);

module.exports = { Task };
