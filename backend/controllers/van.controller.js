const vanModel = require("../models/van.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

// Handle vendor feature 1
// Updates a specific van's ready for order status, location description and
// latitude/longitude values.
exports.setVanStatus = async (req, res) => {
  try {
    await vanModel.updateOne(
      { vanName: req.headers.vanname },

      {
        readyForOrders: req.body.readyForOrders,
        locationDescription: req.body.locationDescription,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
      },

      { runValidators: true }
    );
    const van = await vanModel.findOne(
      { vanName: req.headers.vanname }, 
      { _id: 0, password: 0 }
      );
    res.json(van);
  } catch (err) {
    res.status(404)
    res.json({msg: "Unable to process request"})
  }
};

exports.login = (req, res) => {
  const vanName = req.body.vanName;
  const password = req.body.password;

  vanModel.findOne({ vanName: vanName }).then((van) => {
    if (van) {
      try {
        van.validPassword(password).then((passwordIsValid) => {
          if (passwordIsValid) {
            let token = jwt.sign(
              // Sign with unique for van JSON
              {
                vanName: van.vanName,
              },
              process.env.AUTH_KEY,
              {
                expiresIn: "2h",
              }
            );
            res.json({
              msg: "Login successful",
              vanName: van.vanName,
              token,
            });
          } else {
            res.status(404).json({
              msg: "Van name and password do not match.",
            });
            console.log("Password doesn't match");
          }
        });
      } catch (error) {
        res.status(404).json({ msg: "Server error" });
        console.log(error);
      }
    } else {
      res.status(404).json({ msg: "Van name and password do not match." });
      console.log("User not found");
    }
  });
};

exports.authenticateVan = (req, res) => {
  const vanName = req.headers.vanname;

  vanModel
    .findOne({ vanName: vanName })
    .then((van) => {
      if (van) {
        res.status(200).json({
          vanAuthenticated: "true",
          vanName: van.vanName,
          msg: "Van is authenticated",
        });
      } else {
        res.status(404).json({
          vanAuthenticated: "false",
          msg: `Van: ${vanName} not found`,
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        vanAuthenticated: "false",
        msg: `Unable to authenticate ${vanName}`,
      });
      console.log(error);
    });
};

exports.vanDetails = (req, res) => {
  const vanName = req.headers.vanname;
  vanModel
    .findOne({ vanName: vanName }, { _id: 0, password: 0})
    .then((van) => {
      if (van) {
        res.status(200).json(van)
      } else {
        res.status(404).json({
          msg: `Van ${vanName} not found`,
        })
      }
    })
    .catch((error) => {
      res.status(404).json({
        msg: "Something went wrong"
      })
      console.log(error)
    })
}

exports.getVans = async (req, res) => {
  let result = await vanModel.find({readyForOrders: true})
  res.send(result)
}