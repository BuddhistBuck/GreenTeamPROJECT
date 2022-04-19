// Import back-end server packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

// Import controllers
const {
  userCreate,
  userLogin,
  userVerify,
  userLogout,
  getAllUsers,
  userUpdateLastLoggedIn,
} = require("./controllers/userAuth");

const {
  adminCreate,
  adminLogin,
  adminVerify,
  adminLogout,
} = require("./controllers/adminAuth");

const {
  userListCreate,
  userIncreaseListCount,
} = require("./controllers/userList");

const {
  adminListObjectCreate,
  adminGetLists,
  adminDeleteListObject,
} = require("./controllers/adminListObject");

const {
  adminListCreate,
  adminUpdateList,
  adminGetListByTitle,
  adminDeleteList,
  adminDeleteListTerms,
} = require("./controllers/adminList");

// Initialize server
app.use(express.json());
app.use(cors({ origin: "*" }));
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
    console.log(`Server and database connected on port ${process.env.PORT}`);
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
app.get("/users", getAllUsers);
app.post("/user-create", userCreate);
app.post("/user-login", userLogin);
app.get("/user-verify", userVerify);
app.get("/user-logout", userLogout);
// app.post("/user-list-object-create", userListObjectCreate);
// app.post("/user-list-create", userListCreate);
// app.get("/user-get-lists", userGetLists);
// app.post("/user-get-list-by-title", userGetListByTitle);
// app.post("/user-update-list", userUpdateList);
// app.post("/user-delete-list", userDeleteList);
// app.post("/user-delete-list-object", userDeleteListObject);

// Admin routes
app.post("/admin-create", adminCreate);
app.post("/admin-login", adminLogin);
app.get("/admin-verify", adminVerify);
app.get("/admin-logout", adminLogout);
app.post("/admin-list-object-create", adminListObjectCreate);
app.post("/admin-list-create", adminListCreate);
app.get("/admin-get-lists", adminGetLists);
app.post("/admin-get-list-by-title", adminGetListByTitle);
app.post("/admin-update-list", adminUpdateList);
app.post("/admin-delete-list", adminDeleteList);
app.post("/admin-delete-list-object", adminDeleteListObject);
app.post("/admin-delete-list-term", adminDeleteListTerms);
