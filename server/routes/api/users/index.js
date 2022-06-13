const express = require("express");

const app = express();

app.use("/register", require("./register"));
app.use("/login", require("./login"));
app.use("/logout", require("./logout"));
app.use("/auth", require("./auth"));

module.exports = app;
