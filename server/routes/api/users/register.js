const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../../../models/Users");
const { UserSession } = require("../../../models/UserSession");
const app = express.Router();

app.post("/", (req, res) => {
  const { body } = req;
  const { firstName, lastName } = body;
  let { email } = body;

  console.log("error");

  if (!firstName) {
    return res.send({
      success: false,
      errorMessage: "First Name is not Written",
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

    newUser.save((err, user) => {
      if (err)
        return res.send({
          success: false,
          message: "Error: Server Error",
        });
      return res.send({
        success: true,
        message: `${user.firstName} is Registered Email has been sent to ${user.email}`,
      });
    });
  });
});

app.get("/createpass:token", (req, res) => {
  const token = req.params;

  jwt.verify(token, "secret", (err, id) => {
    if (err)
      res.status(400).send({
        success: false,
        message: "Verification Failed",
      });
    User.findOne({ _id: id }, (err, user) => {
      if (err)
        res.status(400).send({
          success: false,
          message: "No User Found",
        });

      return res.status(200).send({
        success: true,
        data: user,
      });
    });
  });
});

app.post("/passwordcreation", (req, res) => {
  const { body } = req;
  const { password, email, id } = body;

  User.findOne({ _id: id, email: email }, (err, user) => {
    if (err)
      res.status(400).send({
        success: false,
        message: "Server Error",
      });

    if (user.length == 0)
      res.status(400).send({
        success: false,
        message: "Server Error",
      });

    const newPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);

    User.findOneAndUpdate(
      { _id: id, email: email },
      { password: newPass },
      (err, user) => {
        if (err)
          res.status(400).send({
            success: false,
            message: "Server Error",
          });

        if (user.length == 0)
          res.status(400).send({
            success: false,
            message: "Server Error",
          });

        return res.status(200).send({
          success: true,
          message: `${user.firstName} is Registered Email has been sent to ${user.email}`,
        });
      }
    );
  });
});

module.exports = app;
