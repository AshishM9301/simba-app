const express = require("express");

const { User } = require("../../../models/Users");
const { UserSession } = require("../../../models/UserSession");
const app = express.Router();

app.post("/", (req, res) => {
  const { body } = req;
  const { password } = body;
  let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      errorMessage: "Email id is not Entered",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      errorMessage: "Password is not Entered",
    });
  }

  email.toLowerCase();

  User.find({ email: email }, (err, users) => {
    if (err) {
      return res.send({
        success: false,
        errorMessage: "Server Error",
      });
    }
    if (users.length != 1) {
      return res.send({
        success: false,
        errorMessage: "User is not yet Registered",
      });
    }

    const user = users[0];

    if (!user.passwordVerification(password)) {
      return res.send({
        success: false,
        errorMessage: "Entered Wrong Password",
      });
    }

    const newUserSession = new UserSession();

    newUserSession.userId = user._id;

    user.generateToken((err, user) => {
      if (err)
        return res.send({
          success: false,
          errorMessage: `Error in Generating token, ${err}`,
        });
      return newUserSession.save((err, data) => {
        if (err)
          return res.send({
            success: false,
            errorMessage: `Error in Recording Session, ${err}`,
          });
        return res.cookie("x_auth_token", user.token).send({
          success: true,
          message: "login Success",
          session: data._id,
          token: user.token,
        });
      });
    });
  });
});

module.exports = app;
