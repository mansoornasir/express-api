const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = function (req, res, next) {
  try {
    const token = req.headers.token;
    const { iat } = jwt.verify(token, process.env.SECRET);
    console.log(new Date(iat));
    next();
  } catch (err) {
    res.status(400).send(err.message);
  }
};
