const express = require("express");
const userRoute = express.Router();
const Joi = require("joi");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().min(5).max(400),
  email: Joi.string().email().required(),
});

userRoute.get("/", (req, res) => {
  res.send("get usres..");
});

userRoute.post("/register", async (req, res) => {
  const message = userSchema.validate(req.body);
  console.log(message);
  if (message.error) {
    res.status(400).send(message.error.details[0].message);
  } else {
    const duplicateUser = await User.findOne({ email: req.body.email });
    if (duplicateUser === null) {
      // insert in to DB
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      const registredUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      res.send(req.body.email + " has been successfully registered.");
    } else res.status(400).send("email already registered.");
  }
});
userRoute.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const reg_user = await User.findOne({ email: email });
  const verified = await bcrypt.compare(password, reg_user.password);

  if (verified) {
    const token = await jwt.sign(
      { _id: reg_user._id, iat: Date.now() },
      process.env.SECRET
    );

    res.send(token);
  } else {
    res.send("Username or password is wrong.");
  }
});

userRoute.patch("/", (req, res) => {
  res.send("We are at patch user...");
});

userRoute.delete("/", (req, res) => {
  res.send("We are at delete user...");
});

module.exports = userRoute;
