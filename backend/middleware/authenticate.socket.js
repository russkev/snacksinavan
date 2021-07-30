const { authenticateVanAndToken } = require("./authenticate.van")
const { authenticateUserAndToken } = require("./authenticate.user")

/**
 * Authenticate user, van or both in the one middleware
 */
authenticateSocket = function(socket,next){
  if (socket.handshake.auth.vanName) {
    try {
      const token = socket.handshake.auth.vanToken.split(" ")[1]
      const vanName = socket.handshake.auth.vanName
      authenticateVanAndToken(vanName, token)
    } catch(error) {
      console.log(error)
      return
    }
  }
  if (socket.handshake.auth.userName) {
    try {
      const token = socket.handshake.auth.token.split(" ")[1]
      const username = socket.handshake.auth.username
      authenticateUserAndToken(username, token);
    } catch (error) {
      console.log(error)
      return
    }
  }
  next()
}

module.exports = authenticateSocket