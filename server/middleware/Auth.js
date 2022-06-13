const { User } = require("../models/Users");

let Auth = (req, res, next) => {
  let token = req.headers.x_auth_token;

  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { Auth };
