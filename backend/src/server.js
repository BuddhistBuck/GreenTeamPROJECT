// Import tools / packages
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dbConfig = require("./db/knex");

// Import route runctions
const dbList = require("./db/listItems");
const dbUser = require("./db/users");

// Initialize app tools
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

// Test route to see if server is running (navigate to http://localhost:4000/test) after running `npm start`
app.get("/test", (req, res) => {
  res.status(200).json({ success: true });
});

// Set CORS options
var corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};

// Listen on CORS-enabled server
app.listen(4000, cors(corsOptions), () => {
  console.log(`CORS-enabled web server listening on port 4000!`);
});

// Set up database variable
const db = dbConfig;

// Create list items, update list items, and get all list items
// TODO: implement delete list items operation
app.post("/listItems", async (req, res) => {
  const results = await dbList.createListItem(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/listItems", async (req, res) => {
  const listItems = await dbList.getAllListItems();
  res.status(200).json({ listItems });
});

app.patch("/listItems/:id", async (req, res) => {
  const id = await dbList.updateListItem(req.params.id, req.body);
  res.status(200).json({ id });
});

// Create user
// TODO: implement delete users operation
// TODO: implement update users operation (change password, change email, change payment)
app.post("/user", async (req, res, err) => {
  const user = await dbUser.createUser(req.body);
  if (user) {
    return res.status(200).json({ success: "true" });
  } else if (err) {
    return res.status(400).json({ success: "false", error: err });
  }
});

// Create admin
app.post("/admin", (request, response, next) => {
  bcrypt.hash(request.body.password, 10).then((hashedPassword) => {
    return db("admins")
      .insert({
        username: request.body.username,
        password_digest: hashedPassword,
      })
      .returning(["id", "username"])
      .then((users) => {
        response.json(users[0]);
      })
      .catch((error) => response.json({ error }));
  });
});

// Admin signin
app.post("/admin-login", (request, response, next) => {
  db("admins")
    .where({ username: request.body.username })
    .first()
    .then((admin) => {
      if (!admin) {
        response.status(401).json({
          error: "No admin by that name",
        });
      } else {
        return bcrypt
          .compare(request.body.password, admin.password_digest)
          .then((isAuthenticated) => {
            if (!isAuthenticated) {
              response.status(401).json({
                error: "Unauthorized Access!",
              });
            } else {
              return jwt.sign(
                admin,
                process.env.TOKEN_SECRET,
                (error, token) => {
                  response.status(200).json({ token });
                }
              );
            }
          });
      }
    });
});

// User signin
app.post("/user-login", async (req, res) => {});

// User signup
app.post("/user-signup", async (req, res) => {});
