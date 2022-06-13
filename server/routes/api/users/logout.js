const express = require("express");

const { User } = require("../../../models/Users");
const { UserSession } = require("../../../models/UserSession");
const { Auth } = require("../../../middleware/Auth");
const app = express.Router();

app.get("/", Auth, (req, res) => {
  const { query } = req;
  const { session } = query;

  UserSession.findOneAndUpdate(
    {
      _id: session,
      isDeleted: false,
    },
    {
      $set: { isDeleted: true },
    },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          errorMessage: "Server Error",
        });
      }
      return User.findOneAndUpdate(
        { _id: req.user._id },
        { token: "" },
        (err, data) => {
          if (err)
            res.send({
              success: false,
              errorMessage: "Server Error",
            });
          return res.send({
            success: true,
            message: "Logged out",
          });
        }
      );
    }
  );
});

module.exports = app;
