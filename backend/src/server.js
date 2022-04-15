// Import back-end server packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

// Import controllers
const {
  userCreate,
  userLogin,
  userVerify,
  userLogout,
} = require("./controllers/userAuth");

const {
  adminCreate,
  adminLogin,
  adminVerify,
  adminLogout,
} = require("./controllers/adminAuth");

// view engine setup
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "jade");

// Initialize app tools
app.use(express.json());
app.use(cors({ origin: "*" }));
dotenv.config();

// Listen to port with CORS options
app.listen(process.env.PORT);

// Set MongoDB database
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_CLUSTER}.kdv7f.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Test route
app.get("/test", (req, res) => {
  res.json({
    connected: "Court Reporter Pro back-end server is running",
  });
});

// User routes
app.post("/user-create", userCreate);
app.post("/user-login", userLogin);
app.get("/user-verify", userVerify);
app.get("/user-logout", userLogout);

// Admin routes
app.post("/admin-create", adminCreate);
app.post("/admin-login", adminLogin);
app.get("/admin-verify", adminVerify);
app.get("/admin-logout", adminLogout);
