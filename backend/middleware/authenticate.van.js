const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

authenticateVanAndToken = function(headerVanName, token) {
  if (!headerVanName || !token) {
    throw new Error(`VanName (${headerVanName}) or token (${token}) are invalid`);
  }

  // Verify the token
  const decodedToken = jwt.verify(token, process.env.AUTH_KEY, (error, decoded) => {
    if (error) {
      // console.log(error)
      throw `Unable to verify van token: ${error.message}`;
    }
    return decoded;
  });

  // Verify vanName encrypted in token is the same as the vanName in the body of the request
  encryptedVanName = decodedToken.vanName;
  if (headerVanName && headerVanName !== encryptedVanName) {
    throw new Error(
      `VanName: ${headerVanName} does not match encrypted vanName: ${encryptedVanName}`
    );
  } else {
    return true;
  }
};

authenticateVanHeader = function(req, res, next) {
  if (req.headers.vanauthorization) {
    try {
      // Access the token from the header (if it exists)
      const token = req.headers.vanauthorization.split(" ")[1];
      const headerVanName = req.headers.vanname;
      if (authenticateVanAndToken(headerVanName, token)) {
        next();
      }
      else {
        throw new Error("Something went wrong")
      }
    } catch (err) {
      res.status(200).json({
        vanAuthenticated: "false",
        msg: "Authentication failed.",
      });
      console.log(err);
    }
  } else {
    res.status(200).json({
      vanAuthenticated: "false",
      msg: "No van authentication in header",
    });
  }
};

module.exports = { authenticateVanHeader, authenticateVanAndToken };
