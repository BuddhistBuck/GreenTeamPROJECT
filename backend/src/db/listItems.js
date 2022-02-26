const knex = require("./knex");

function createListItem(listItem) {
  return knex("listItems").insert(listItem);
}

function getAllListItems() {
  return knex("listItems").select("*");
}

function deleteListItem() {
  return knex("listItems").where("id", id).del();
}

function updateListItem() {
  return knex("listItems").where("id", id).update(listItem);
}

module.exports = {
  createListItem,
  getAllListItems,
  deleteListItem,
  updateListItem,
};
