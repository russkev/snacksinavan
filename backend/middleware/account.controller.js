const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Helper function
async function checkUserExists(username) {
  result = User.findOne({ username: username })
    .then((user) => {
      if (user) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      throw error;
    });
  return result;
}

// Encrypt submitted password
exports.signup = async (req, res) => {
  try {
    userExists = await checkUserExists(req.body.username);
    if (userExists) {
      res.status(409).json({ msg: "Username taken" });
    } else {
      let newUser = new User();
      newUser.firstName = req.body.firstName;
      newUser.lastName = req.body.lastName;
      newUser.username = req.body.username;
      newUser.password = await newUser.generateHash(req.body.password);
      newUser
        .save()
        .then((user) => {
          res.json({
            msg: `Successfully added ${user.username}`,
          });
        })
        .catch((error) => {
          res.status(500).json({
            msg: `Something went wrong: ${error}`,
          });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error. Something went wrong" });
  }
};


exports.updateInfo = async (req, res) => {
  try {
    user = await User.findOne({username: req.body.username})
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    if (req.body.password){
      user.password = await user.generateHash(req.body.password);
    }
    user.save().then((user) => {
      res.json({
      msg: `Successfully updated ${user.username}`,
      });
    }).catch((error) => {
      res.status(500).json({
        msg: `Something went wrong: ${error}`,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error. Something went wrong" });
  }
};

exports.userCheck = async (req, res) => {
  try {
    userExists = await checkUserExists(req.params.username);
    if (userExists) {
      res.status(409).json({ msg: "Username taken" });
    } else {
      res.status(200).json({ msg: "Username available" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error. something went wrong" });
  }
};

// Allow user login
exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username: username }).then((user) => {
    if (user) {
      try {
        user.validPassword(password).then((passwordIsValid) => {
          if (passwordIsValid) {
            let token = jwt.sign(
              // Sign with unique for user JSON
              {
                username: user.username,
              },
              process.env.AUTH_KEY,
              {
                expiresIn: "5d",
              }
            );
            res.json({
              msg: "Login successful.",
              username: user.username,
              token,
            });
          } else {
            res.status(404).json({
              msg: "User and password do not match.",
            });
            console.log("Password doesn't match");
          }
        });
      } catch (error) {
        res.status(404).json({ msg: "Server error" });
        console.log(error);
      }
    } else {
      res.status(404).json({ msg: "User and password do not match." });
      console.log("User not found");
    }
  });
};

exports.authenticate = (req, res) => {
  const username = req.headers.username;

  User.findOne({ username: username })
    .then((user) => {
      if (user) {
        res.status(200).json({
          authenticated: "true",
          username: user.username,
          msg: "User is authenticated",
        });
      } else {
        res.status(404).json({
          authenticated: "false",
          msg: `User: ${username} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        authenticated: "false",
        msg: `Unable to authenticate ${username}`,
      });
      console.log(error)
    });
};

exports.info = async (req, res) => {
  try {
    result = await User.findOne({username: req.params.username});
    res.send(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error. something went wrong" });
  }
};
