// Import back-end server packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, console.log(`Server started on ${HOST}:${PORT}`));

// Import controllers
const {
  userCreate,
  userLogin,
  userVerify,
  userLogout,
  getAllUsers,
  userUpdate,
  getUserByEmail,
} = require("./controllers/UserAuth");

const {
  adminCreate,
  adminLogin,
  adminVerify,
  adminLogout,
} = require("./controllers/AdminAuth");

const {
  userListCreate,
  userGetListByTitle,
  userUpdateList,
  userDeleteList,
  userDeleteListTerm,
} = require("./controllers/UserList");

const {
  adminListObjectCreate,
  adminGetLists,
  adminDeleteListObject,
} = require("./controllers/AdminListObject");

const {
  adminListCreate,
  adminUpdateList,
  adminGetListByTitle,
  adminDeleteList,
  adminDeleteListTerm,
} = require("./controllers/AdminList");

const {
  userListObjectCreate,
  userGetLists,
  userDeleteListObject,
} = require("./controllers/UserListObject");

const {
  adminGetEvents,
  adminCreateEvent,
} = require("./controllers/AdminEvent");

//
// Initialize server
app.use(express.json());

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
    console.log(`Database connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());

// Set up headers for API configuration
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
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
app.post("/user-update", userUpdate);
app.post("/get-user-by-email", getUserByEmail);
app.post("/user-list-object-create", userListObjectCreate);
app.post("/user-list-create", userListCreate);
app.post("/user-get-lists", userGetLists);
app.post("/user-get-list-by-title", userGetListByTitle);
app.post("/user-update-list", userUpdateList);
app.post("/user-delete-list", userDeleteList);
app.post("/user-delete-list-object", userDeleteListObject);
app.post("/user-delete-list-term", userDeleteListTerm);

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
app.post("/admin-delete-list-term", adminDeleteListTerm);
app.get("/admin-get-event-logs", adminGetEvents);
app.post("/admin-create-event-log", adminCreateEvent);
