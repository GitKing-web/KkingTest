const { Router } = require("express");

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
router.post("/login", (req, res) => {
  console.log(req.body);
  return res.status(200).send(req.body);
});

// register
router.get("/register", (req, res) => {});

module.exports = router;
