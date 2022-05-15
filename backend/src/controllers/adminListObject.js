const AdminListObject = require("../models/AdminListObjectModel");

// Create an admin list object
exports.adminListObjectCreate = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.send({
      success: false,
      message: "error: Name parameter cannot be blank",
    });
  }

  AdminListObject.find(
    {
      name: name,
    },
    (err, previousListObject) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error",
        });
      } else if (previousListObject.length > 0) {
        return res.send({
          success: false,
          message: "Error: Admin list already exists.",
        });
      }

      // Save the new user
      const newList = new AdminListObject();
      newList.name = name;
      newList.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: List object creation attempted, server error",
          });
        }
        return res.send({
          success: true,
          message: "List object created",
        });
      });
    }
  );
};

// Get all admin list objects
exports.adminGetLists = (req, res) => {
  AdminListObject.find({}).exec((error, lists) => {
    if (error) return res.status(400).json({ error });
    if (lists) {
      res.status(200).json({ lists });
    }
  });
};

// Delete admin list objects
exports.adminDeleteListObject = async (req, res) => {
  const { name } = req.body;
  const deleteListObj = await AdminListObject.findOneAndDelete({
    name: name,
  });

  if (deleteListObj) {
    res.status(201).json({ message: "List object removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
