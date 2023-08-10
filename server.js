const express = require("express");
const path = require("path");
const app = express();
const connectDB = require("./configs/config.index");
const dotenv = require("dotenv");
const session = require("express-session");
const router = require("./routes/router");
const PORT = process.env.PORT || 3001;

dotenv.config();
app.use(
  session({
    secret: "this is my secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 24 * 24 * 24 * 30 * 1,
    },
  })
);
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (req.session) {
    next();
  } else {
    res.status(301).redirect("/");
  }
});

// routes
app.use("/", router);

// page not found
app.use((req, res, next) => {
  const error = new Error(`${req.originalUrl} page not found`);
  res.status(404);
  next(error);
});

// error handler
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.send({
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
});

app.listen(PORT, async () => {
  await connectDB()
    .then(() => console.log("DB connected."))
    .catch((error) => console.log(error));
  console.log("server running...", PORT);
});
