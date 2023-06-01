const jwt = require("jsonwebtoken")
const utils = require("./utils")

let { usersTab, currId } = require("./userModel")

require("dotenv").config()

module.exports = {
   getProfile: async (req, res) => {

      if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
         res.writeHead(400, { 'Content-Type': 'text/plain' })
         res.end("no token")
         return
      }

      let token = req.headers.authorization.split(" ")[1]
      let userProfile
      
      try { 
         let decoded = await utils.verifyToken(token)
         userProfile = usersTab.find((el) => el.id == decoded.id)
         
      } catch (ex) {
         res.writeHead(400, { 'Content-Type': 'text/plain' })
         res.end("invalid token")
         return
      }

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(userProfile))
   },

   patchProfile: async (req, res) => {
      if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
         res.writeHead(400, { 'Content-Type': 'text/plain' })
         res.end("no token")
         return
      }

      let token = req.headers.authorization.split(" ")[1]
      let decoded
      
      try {
         decoded = await utils.verifyToken(token)
      } catch (ex) {
         res.writeHead(400, { 'Content-Type': 'text/plain' })
         res.end("invalid token")
         return
      }

      let newCredentials = await utils.getReqJSON(req)

      let userProfile = usersTab.find(el => el.id == decoded.id)
      userProfile.firstName = newCredentials.firstName
      userProfile.lastName = newCredentials.lastName

   }
}