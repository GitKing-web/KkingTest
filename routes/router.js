const { Router } = require("express");
const User = require("../models/model.User");
const router = Router();

//  GET request
//login
router.get("/", (req, res) => {
  res.status(200).render("login");
});

// home
router.get("/home", (req, res) => {
  res.status(200).render("index");
});

// register
router.get("/register", (req, res) => {
  res.status(200).render("register");
});

// profile
router.get("/profile/:id", (req, res) => {
  res.status(200).render("profile");
});

// cash
router.get("/cash/:id", (req, res) => {
  res.status(200).render("cash");
});

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
    req.session.userId = user.phone;
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
