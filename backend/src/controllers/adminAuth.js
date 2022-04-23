const Admin = require("../models/AdminModel");
const AdminSession = require("../models/AdminSessionModel");

exports.adminCreate = (req, res, next) => {
  const { body } = req;
  const { username, password } = body;

  if (!username) {
    return res.send({
      success: false,
      message: "error: Username cannot be blank",
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: "error: Password cannot be blank",
    });
  }

  // verify email
  Admin.find(
    {
      username: username,
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
          message: "Error: Account already exists.",
        });
      }

      // save the new user
      const newAdmin = new Admin();
      newAdmin.username = username;
      newAdmin.password = newAdmin.generateHash(password);
      newAdmin.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: account creation attempted, server error",
          });
        }
        return res.send({
          success: true,
          message: "Signed up",
        });
      });
    }
  );
};

exports.adminLogin = (req, res, next) => {
  const { body } = req;
  const { username, password } = body;

  if (!username) {
    return res.send({
      success: false,
      message: "Error: username cannot be blank.",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error: password cannot be blank.",
    });
  }

  Admin.find(
    {
      username: username,
    },
    (err, admins) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      if (admins.length != 1) {
        return res.send({
          success: false,
          message: "Invalid Username or Password",
        });
      }

      const admin = admins[0];

      const isPassword = admin.validPassword(password);

      if (!isPassword) {
        return res.send({
          success: false,
          message: "Invalid Username or Password",
        });
      }

      // NOTE: if correct user
      const adminSession = new AdminSession();
      adminSession.adminId = admin._id;
      adminSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: server error",
          });
        }

        return res.send({
          success: true,
          message: "Valid sign in",
          token: doc._id,
        });
      });
    }
  );
};

exports.adminVerify = (req, res, next) => {
  const { query } = req;
  const { token } = query;

  // Verify the token is unique
  AdminSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: "Error: Invalid session, session already occuring",
        });
      } else {
        return res.send({
          success: true,
          message: "Good",
        });
      }
    }
  );
};

exports.adminLogout = (req, res, next) => {
  // Get the token
  const { query } = req;
  const { token } = query; // NOTE: for ?token=test

  // Verify the token is unique
  AdminSession.findOneAndUpdate(
    {
      _id: token,
      isDeleted: false,
    },
    { $set: { isDeleted: true } },
    null,
    (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error",
        });
      }
      return res.send({
        success: true,
        message: "Good",
      });
    }
  );
};
