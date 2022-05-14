const User = require("../models/UserModel");
const UserList = require("../models/UserListModel");

exports.userListCreate = (req, res, next) => {
  const { email, listTitle, listTerms } = req.body;

  if (!email) {
    return res.send({
      success: false,
      message: "error: Email cannot be blank",
    });
  }

  if (!listTitle) {
    return res.send({
      success: false,
      message: "error: List title cannot be blank",
    });
  }

  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      // Save new user list
      const list = new UserList();
      list.email = email;
      list.listTitle = listTitle;
      list.listTerms = listTerms;

      list.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: List creation attempted, server error",
          });
        } else {
          return res.send({
            success: true,
            message: "User list created",
          });
        }
      });
    }
  );
};

exports.userUpdateList = (req, res, next) => {
  const { email, listTitle, newListTerms } = req.body;

  UserList.findOneAndUpdate(
    {
      email: email,
      listTitle: listTitle,
    },
    {
      $addToSet: { listTerms: newListTerms },
    },
    { returnOriginal: false },
    (docs, err) => {
      if (docs) {
        res.status(200).send({ docs });
      } else {
        res.json({ err });
      }
    }
  );
};

exports.userGetListByTitle = (req, res, next) => {
  const { email, listTitle } = req.body;

  UserList.find(
    {
      email: email,
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

exports.userDeleteList = async (req, res) => {
  const { email, listTitle } = req.body;
  const deleteList = await UserList.findOneAndDelete({
    email: email,
    listTitle: listTitle,
  });

  if (deleteList) {
    res.status(201).json({ message: "List removed" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
};

// Deletes a single list term from database
exports.userDeleteListTerm = async (req, res) => {
  const { email, listTitle, listTerm } = req.body;
  const deleteListTerm = await UserList.updateOne(
    {
      email: email,
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
