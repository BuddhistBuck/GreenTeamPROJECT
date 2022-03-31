// Import packages
const knex = require("./knex");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sqlite3 = require("sqlite3").verbose();

// Creates a new user from request
function createUser(user) {
  let db = new sqlite3.Database("../../cwc.sqlite3");

  // Check for unique user
  let checkUniqueQuery = `SELECT DISTINCT Name name FROM playlists
           ORDER BY name`;

  if (!userAlreadyExists) {
    return knex("users").insert(user);
  } else {
    return "User not created";
  }
}

function userAlreadyExists() {
    
}




module.exports = {
  createUser,
};
