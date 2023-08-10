const { Router } = require("express");
const User = require("../models/model.User");
const router = Router();

//  GET request
//login
router.get("/", (req, res) => {
  if (req.session.isLoggedIn) {
    res.status(301).redirect("/home");
  } else {
    return res.status(200).render("login");
  }
});

// home
router.get("/home", (req, res) => {
  if (req.session.isLoggedIn) {
    return res.status(200).render("index");
  }
  return res.redirect("/");
});

// register
router.get("/register", (req, res) => {
  return res.status(200).render("register");
});

// profile
router.get("/profile", (req, res) => {
  if (req.session.isLoggedIn) {
    return res.status(200).render("profile", {
      user: req.session.user,
    });
  } else {
    return res.redirect("/");
  }
});

// cash
router.get("/cash", (req, res) => {
  if (req.session.isLoggedIn) {
    return res.status(200).render("cash", {
      user: req.session.user,
    });
  } else {
    return res.redirect("/");
  }
});

// editor page
router.get("/admin/editor", async (req, res) => {
  req.session.isLoggedIn = true;
  const users = await User.find();
  res.status(200).render("editor", {
    show: false,
    users,
  });
});

router.get("/admin/view/:id", async (req, res) => {
  req.session.isLoggedIn = true;
  const user = await User.findById(req.params.id);
  res.status(200).render("editor", {
    show: true,
    user,
  });
});

// router.post("/admin/edit", async (req,res) => {})

// POST request
// login
router.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    if (password !== user.password) {
      return res.status(400).send({ message: "Invalid credentials" });
    }
    req.session.isLoggedIn = true;
    req.session.user = user;
    // console.log(req.session.userId);
    return res.status(200).send({ user });
  } catch (error) {
    console.log(error);
  }
});

// register
router.post("/register", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const existingNumber = await User.findOne({ phone });
    if (existingNumber)
      return res.status(400).send({
        message: "Phone Number already linked to an account, continue to login",
      });
    const users = new User({
      phone,
      password,
    });

    await users.save();
    return res.status(201).send({ message: "Account created!" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
