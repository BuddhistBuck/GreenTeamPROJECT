const UserListObject = require("../models/UserListObjectModel");

// Create a user list object
exports.userListObjectCreate = (req, res) => {
  const { email, name } = req.body;

  if (!name) {
    return res.send({
      success: false,
      message: "error: Name parameter cannot be blank",
    });
  }

  if (!email) {
    return res.send({
      success: false,
      message: "error: Enauk parameter cannot be blank",
    });
  }

  UserListObject.find(
    {
      email: email,
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
          message: "Error: User list already exists.",
        });
      }

      // Save the new list object
      const newList = new UserListObject();
      newList.name = name;
      newList.email = email;
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

// Get all list objects
exports.userGetLists = (req, res) => {
  const { email } = req.body;

  UserListObject.find({ email: email }).exec((error, lists) => {
    if (error) return res.status(400).json({ error });
    if (lists) {
      res.status(200).json({ lists });
    }
  });
};

exports.userDeleteListObject = async (req, res) => {
  const { email, name } = req.body;
  const deleteListObj = await UserListObject.findOneAndDelete({
    email: email,
    name: name,
  });

  if (deleteListObj) {
    res.status(201).json({ message: "List object removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
