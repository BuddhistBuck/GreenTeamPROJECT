// Import back-end server packages
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();

// Add CORS headers 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// view engine setup
app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "jade");

// Initialize app tools
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");

// Set CORS options
var corsOptions = {
  origin: `*`,
  optionSuccessStatus: 200,
};

// Listen to port with CORS options
app.listen(process.env.PORT, cors(corsOptions), () => {
  console.log(`CORS-enabled web server listening on port ${process.env.PORT}!`);
});

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

// routes
app.use("/account", authRoutes);
