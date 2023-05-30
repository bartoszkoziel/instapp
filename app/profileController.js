const jwt = require("jsonwebtoken")
const utils = require("./utils")

let { usersTab, currId } = require("./userModel")

require("dotenv").config()

module.exports = {
   getProfile: async (req, res) => {

      if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
         res.writeHead(400, { 'Content-Type': 'text/plain' })
         res.end("invalid token")
         return
      }

      let token = req.headers.authorization.split(" ")[1]
      
      try {
         console.log(utils.verifyToken(token))
      } catch(ex){
         console.log(ex)
      }
   }
}