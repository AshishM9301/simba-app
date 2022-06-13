const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();

const { User } = require("./models/Users");
const { UserSession } = require("./models/UserSession");
const { Auth } = require("./middleware/Auth");
const config = require("./config/keys");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database is Connected"))
  .catch((err) => console.log(err));

app.use("/", require("./routes"));

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);

if (process.env.NODE_ENV === "production") {
  // Set Static Folder
  app.use(express.static("web/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server Started on ${port}`));
