const User = require("../models/UserModel");
const UserSession = require("../models/UserSessionModel");

// Create a user account
exports.userCreate = (req, res, next) => {
  const { body } = req;
  const { email, firstName, lastName, occupation, phoneNumber, password } =
    body;

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

  if (!password) {
    return res.send({
      success: false,
      message: "error: Password cannot be blank",
    });
  }

  // Verify email
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
          message: "Error: Email already exists.",
        });
      }

      // save the new user
      const newUser = new User();
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.occupation = occupation;
      newUser.phoneNumber = phoneNumber;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: err,
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

// Log into an existing user account
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
          email: email,
          firstName: user.firstName,
          lastName: user.lastName,
          darkTheme: user.darkTheme,
        });
      });
    }
  );
};

// Verify if user is logged in
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

// Log out user
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

// Get all users
exports.getAllUsers = async (req, res) => {
  User.find({}, function (err, users) {
    // var userMap = {};

    // users.forEach(function (user) {
    //   userMap[(user.firstName, user.lastName, user.email, user.occupation)] =
    //     user;
    // });

    res.send(users);
  });
};

// Get a user by email
exports.getUserByEmail = async (req, res) => {
  const { body } = req;
  const { email } = body;
  User.find(
    {
      email: email,
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

// Update user information
exports.userUpdate = (req, res, next) => {
  const { body } = req;
  const {
    firstName,
    lastName,
    email,
    subscriptionStatus,
    emailConfirmed,
    occupation,
    phoneNumber,
    password,
    darkTheme,
  } = body;

  if (!email) {
    return res.send({
      success: false,
      message: "Error: email cannot be blank.",
    });
  }

  User.findOne(
    {
      email: email,
    },
    function (err, user) {
      if (firstName) user.firstName = firstName;
      if (lastName) user.lastName = lastName;
      if (email) user.email = email;
      if (subscriptionStatus) user.subscriptionStatus = subscriptionStatus;
      if (emailConfirmed) user.emailConfirmed = emailConfirmed;
      if (occupation) user.occupation = occupation;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (password) user.password = password;
      if (darkTheme) user.darkTheme = darkTheme;

      user.save(function (err) {
        if (err) {
          return res.send({
            success: false,
            message: err,
          });
        } else {
          return res.send({ success: true, message: "User updated" });
        }
      });
    }
  );
};
