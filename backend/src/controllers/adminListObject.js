const AdminListObject = require("../models/AdminListObjectModel");

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
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error",
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Admin list already exists.",
        });
      }

      // save the new user
      const newList = new AdminListObject();
      newList.name = name;
      newList.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: category creation attempted, server error",
          });
        }
        return res.send({
          success: true,
          message: "Category created",
        });
      });
    }
  );
};

exports.adminGetLists = (req, res) => {
  AdminListObject.find({}).exec((error, lists) => {
    if (error) return res.status(400).json({ error });
    if (lists) {
      res.status(200).json({ lists });
    }
  });
};

exports.adminListObjectUpdate = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
      }

      const updatedCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      );
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updateCategories: updatedCategories });
  } else {
    const category = {
      name,
      type,
    };
    if (parentId !== "") {
      category.parentId = parentId;
    }
    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    });
    return res.status(201).json({ updatedCategory });
  }
};



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
