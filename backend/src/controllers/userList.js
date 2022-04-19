const User = require("../models/userModel");
const UserList = require("../models/userListModel");

exports.userListCreate = (req, res, next) => {
  const { email, listTitle, listTerms } = req.body;

  if (!email) {
    return res.send({
      success: false,
      message: "error: userId cannot be blank",
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
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Cannot find user",
        });
      }

      // save the new user
      const list = new UserList();
      list.email = email;
      list.listTitle = listTitle;
      list.listTerms = listTerms;

      list.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: account creation attempted, server error",
          });
        }
        return res.send({
          success: true,
          message: "User list created",
        });
      });
    }
  );
};
