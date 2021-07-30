const jwt = require("jsonwebtoken");

const authenticateUserAndToken = function(headerUsername, token) {
  if (!headerUsername || !token) {
    throw new Error(`Username (${headerUsername}) or token (${token}) is invalid`);
  }

  // Verify the token
  const decodedToken = jwt.verify(token, process.env.AUTH_KEY, (error, decoded) => {
    if (error) {
      throw `Unable to verify user token: ${error.message}`;
    }
    return decoded;
  });

  // Verify username encrypted in token is the same as the username in the body of the request
  encryptedUsername = decodedToken.username;
  if (headerUsername && headerUsername !== encryptedUsername) {
    console.log("Username does not match encrypted username");
    throw "Username is invalid";
  } else {
    return true
  }
}

const authenticateUser = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      // Access the token from the header (if it exists)
      const token = req.headers.authorization.split(" ")[1];
      const headerUsername = req.headers.username;
      
      if (authenticateUserAndToken(headerUsername, token)) {
        next()
      } else {
        throw new Error("Something went wrong")
      }
    } catch (err) {
      res.status(200).json({
        authenticated: "false",
        msg: "Authentication failed",
      });
      console.log(err);
    }
  } else {
    res.status(200).json({
      authenticated: "false",
      msg: "No authentication in header",
    })
  }
};

module.exports = { authenticateUser, authenticateUserAndToken };
