const { Router } = require("express");
const User = require('../models/model.User');
const router = Router();

//  GET request
// home
router.get("/", (req, res) => {
  res.status(200).render("index");
});

//login
router.get("/login", (req, res) => {
  res.status(200).render("login");
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
    const user = await User.findOne({ phone })
    if(!user){
      console.log('Invalid credentials.');
      return;
    }
    if(password !== user.password){
      console.log('Invalid credentials');
      return;
    }
  return console.log('login successful...');
  } catch (error) {
    console.log(error);
  }
});

// register
router.post("/register", async(req, res) => {
  try {
    const { phone, password } = req.body;
    const users = new User({
      phone, password
    })

    const user = await users.save();
    console.log(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
