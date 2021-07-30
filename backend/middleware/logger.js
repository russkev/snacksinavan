const moment = require("moment");

// Middleware allows functions to be run on requests before they reach their
// destination final

// Create middleware for logging address and time of any request.
const logger = (req, res, next) => {
  console.log(
    `${req.protocol}://${req.get("host")}${
      req.originalUrl
    } : ${moment().format()}`
  );
  next();
};

module.exports = logger;
