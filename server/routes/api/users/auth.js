const express = require("express");

const { Auth } = require("../../../middleware/Auth");
const app = express.Router();

app.get("/", Auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAuth: true,
    email: req.user.email,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
    role: req.user.role,
  });
});

module.exports = app;
