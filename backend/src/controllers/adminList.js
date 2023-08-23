const AdminList = require("../models/AdminListModel");

// Create an admin list
exports.adminListCreate = (req, res, next) => {
  const { listTitle, listTerms } = req.body;

  if (!listTitle) {
    return res.send({
      success: false,
      message: "Error: List title cannot be blank",
    });
  }

  AdminList.find(
    {
      listTitle: listTitle,
    },
    (err) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }

      // save the new user
      const list = new AdminList();
      list.listTitle = listTitle;
      list.listTerms = listTerms;

      list.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Admin list creation attempted, server error",
          });
        }
        return res.send({
          success: true,
          message: "Admin list created",
        });
      });
    }
  );
};

// Update an admin list
exports.adminUpdateList = (req, res, next) => {
  const { listTitle, newListTerms } = req.body;

  AdminList.findOneAndUpdate(
    {
      listTitle: listTitle,
    },
    {
      $push: { listTerms: newListTerms },
    },
    { returnOriginal: false },
    (res, err) => {
      if (res) {
        res.status(200).json({ res });
      } else {
        return console.log(err);
      }
    }
  );
};

// Get an admin list by title
exports.adminGetListByTitle = (req, res, next) => {
  const { listTitle } = req.body;

  AdminList.find(
    {
      listTitle: listTitle,
    },
    (err, docs) => {
      if (docs) {
        res.status(200).send({ docs });
      } else {
        res.json({ err });
      }
    }
  );
};

// Delete an admin list
exports.adminDeleteList = async (req, res) => {
  const { listTitle } = req.body;
  const deleteListObj = await AdminList.findOneAndDelete({
    listTitle: listTitle,
  });

  if (deleteListObj) {
    res.status(201).json({ message: "List removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// Deletes a single list term from database
exports.adminDeleteListTerm = async (req, res) => {
  const { listTitle, listTerm } = req.body;
  const deleteListTerm = await AdminList.updateOne(
    {
      listTitle: listTitle,
    },
    { $pull: { listTerms: listTerm } }
  );

  if (deleteListTerm) {
    res.status(201).json({ message: "List term removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};
