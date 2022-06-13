const express = require("express");

const { User } = require("../../../models/Users");
const { UserSession } = require("../../../models/UserSession");
const app = express.Router();

app.post("/", (req, res) => {
  const { body } = req;
  const { firstName, lastName, password } = body;
  let { email } = body;

  console.log("error");

  if (!firstName) {
    return res.send({
      success: false,
      errorMessage: "First Name is not Wriiten",
    });
  }
  if (!lastName) {
    return res.send({
      success: false,
      errorMessage: "Last Name is not Written",
    });
  }
  if (!email) {
    return res.send({
      success: false,
      errorMessage: "Email is blank",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      errorMessage: "Password field is Empty",
    });
  }
  if (password.length < 6) {
    return res.send({
      success: false,
      errorMessage: "Password is less than 6 character",
    });
  }

  email = email.toLowerCase();

  User.find({ email: email }, (err, registeredUser) => {
    if (err) {
      return res.send({
        success: false,
        errorMessage: "Server error",
      });
    } else if (registeredUser.length > 0) {
      return res.send({
        success: false,
        errorMessage: "Already registered",
      });
    }

    const newUser = new User(req.body);

    newUser.email = email;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = newUser.generateHash(password);

    newUser.save((err, user) => {
      if (err)
        return res.send({
          success: false,
          message: "Error: Server Error",
        });
      return res.send({
        success: true,
        message: `${user.firstName} is Registered`,
      });
    });
  });
});

module.exports = app;
