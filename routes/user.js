const express = require("express");
const User = require("../models/user");

const routerUser = express.Router();

routerUser.post("/siswa/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userUsername = await User.findOne({ username: username });
    const userPassword = await User.findOne({ password: password });

    if (userUsername && userPassword) {
      req.session.name = username;
      res.redirect("/home");
    } else {
      res.redirect("/");

      throw new Error("username or password is wrong");
    }
  } catch (error) {
    res.render("login", {
      title: "login",
      layout: "login",
      msg: req.flash("msg", error.message),
      errors: error.message,
    });
  }
});

module.exports = routerUser;
