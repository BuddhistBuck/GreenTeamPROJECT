const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/listItems");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/listItems", async (req, res) => {
  const results = await db.createListItem(req.body);
  res.status(201).json({ id: results[0] });
});

app.get("/listItems", async (req, res) => {
  const listItems = await db.getAllListItems();
  res.status(200).json({ listItems });
});

app.patch("/listItems/:id", async (req, res) => {
  const id = await db.updateListItem(req.params.id, req.body);
  res.status(200).json({ id });
});

// Test route to see if server is running (navigate to http://localhost:4000/test) after running `npm start`
app.get("/test", (req, res) => {
  res.status(200).json({ success: true });
});

var corsOptions = {
  origin: "http://localhost:4000",
  optionSuccessStatus: 200,
};

app.listen(4000, cors(corsOptions), () => {
  console.log(`CORS-enabled web server listening on port 4000!`);
});
