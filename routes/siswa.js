const express = require("express");
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const methodOver = require("method-override");
const Siswa = require("../models/siswa");
const validation = require("../utils/helpers");
const User = require("../models/user");

router.get("", async (req, res) => {
  try {
    await res.render("login", {
      layout: "login",
      title: "Login",
      msg: req.flash("msg"),
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/home", async (req, res) => {
  try {
    if (!req.session.name) {
      res.redirect("/");
    }

    await res.render("index", {
      layout: "index",
      title: "Home",
      name: req.session.name,
      flash: req.flash("success"),
    });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/siswa/json", async (req, res) => {
  const siswa = await Siswa.find();

  siswa.map((s) => s.tgl_masuk)

  res.status(200).json({
    data: siswa,
  });
});

router.get("/siswa", async (req, res) => {
  try {
    if (!req.session.name) {
      res.redirect("/");
    }
    const siswa = await Siswa.find();
    res.render("Home", {
      siswa: siswa,
      layout: "Home",
      title: "Home",
      name: req.session.name,
      msg: req.flash("msg"),
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.get("/siswa/add", async (req, res) => {
  try {
    if (!req.session.name) {
      res.redirect("/");
    }
    await res.render("addSiswa", {
      title: "add Siswa",
      layout: "addSiswa",
      name: req.session.name,
      msg: req.flash("msg"),
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/siswa", async (req, res) => {
  const errors = validationResult(req.body);
  try {
    const { nama, nisn, nik, nokk, ttl } = req.body;

    const duplikatNIK = await Siswa.findOne({ nik: req.body.nik });
    const duplikatNISN = await Siswa.findOne({ nisn: req.body.nisn });

    validation(nama.toString(), nisn, nik, nokk, ttl);

    if (duplikatNIK) {
      req.flash("msg", "NIK Already exist");
      // res.redirect("/siswa/add");

      throw new Error("NIK Already exist");
    } else if (duplikatNISN) {
      req.flash("msg", "NISN Already exiet");
      // res.redirect("/siswa/add");

      throw new Error("NISN Already exiet");
    } else if (duplikatNIK && duplikatNISN) {
      req.flash("msg", "NIK and NISN Already exist");
      // res.redirect("/siswa/add");

      throw new Error("NIK and NISN Already exist");
    } else {
      const siswa = new Siswa(req.body);
      await siswa.save(); // Save to the database
      req.flash("msg", "Siswa Added");

      res.redirect("/siswa");
    }
  } catch (error) {
    // console.log(error.message);
    // console.log(error);

    // console.log(errors.array());
    res.render("addSiswa", {
      title: "add Siswa",
      layout: "addSiswa",
      name: req.session.name,
      // msg: req.flash("msg", "Siswa Added"),
      errors: error.message,
    });
  }
});

router.get("/siswa/edit/:id", async (req, res) => {
  try {
    if (!req.params.id) {
      return res.redirect("/siswa");
    }

    if (!req.session.name) {
      res.redirect("/");
    }

    const siswa = await Siswa.findOne({ _id: req.params.id });
    await res.render("editSiswa", {
      siswa: siswa,
      title: "edit siswa",
      layout: "editSiswa",
      name: req.session.name,
    });
  } catch (error) {
    res.flash("msg", `error: ${error.message}`);
    res.redirect("/siswa");
  }
});

router.get("siswa/:nama", async (req, res) => {
  try {
    if (!req.session.name) {
      res.redirect("/");
    }
    const siswa = await Siswa.findOne({ name: req.params.nama });
    res.send({
      data: siswa,
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/siswa/:id", async (req, res) => {
  try {
    await Siswa.findByIdAndDelete(req.params.id); // Delete the user by ID
    req.flash("msg", "Siswa Deleted");
    res.redirect("/siswa");
  } catch (error) {
    res.flash("msg", `error: ${error.message}`);

    res.redirect("/siswa");
  }
});

router.put("/siswa/edit/:id", async (req, res) => {
  try {
    await Siswa.findByIdAndUpdate(req.params.id, req.body); // Delete the user by ID
    req.flash("msg", "Siswa Updated");
    res.redirect("/siswa");
  } catch (error) {
    res.render("addSiswa", {
      title: "add Siswa",
      layout: "addSiswa",
      name: req.session.name,
      msg: req.flash("msg"),
      errors: error.message,
    });
  }
});

module.exports = router;
