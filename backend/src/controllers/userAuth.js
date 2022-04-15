const User = require("../models/userModel");
const UserSession = require("../models/userSessionModel");

exports.userCreate = (req, res, next) => {
  const { body } = req;
  const { email, firstName, lastName, occupation, password } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "error: Email cannot be blank",
    });
  }

  if (!firstName) {
    return res.send({
      success: false,
      message: "error: First name cannot be blank",
    });
  }

  if (!lastName) {
    return res.send({
      success: false,
      message: "error: Last name cannot be blank",
    });
  }

  if (!occupation) {
    return res.send({
      success: false,
      message: "error: Occupation cannot be blank",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "error: Password cannot be blank",
    });
  }

  // verify email
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
          message: "Error: Account already exists.",
        });
      }

      // save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.occupation = occupation;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
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

exports.userLogin = (req, res, next) => {
  const { body } = req;
  const { email, password } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: email cannot be blank.",
    });
  }

  if (!password) {
    return res.send({
      success: false,
      message: "Error: password cannot be blank.",
    });
  }

  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: server error",
        });
      }
      if (users.length != 1) {
        return res.send({
          success: false,
          message: "Invalid Email or Password",
        });
      }

      const user = users[0];

      const isPassword = user.validPassword(password);

      if (!isPassword) {
        return res.send({
          success: false,
          message: "Invalid Email or Password",
        });
      }

      // NOTE: if correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
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

exports.userVerify = (req, res, next) => {
  const { query } = req;
  const { token } = query;

  // Verify the token is unique
  UserSession.find(
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

exports.userLogout = (req, res, next) => {
  // Get the token
  const { query } = req;
  const { token } = query; // NOTE: for ?token=test

  // Verify the token is unique
  UserSession.findOneAndUpdate(
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