const bcrypt = require("bcryptjs")
require("dotenv").config()

const getTagByName = (tagsTab, name) => {
   tagsTab.forEach((item) => {
      if (item.name == name) return
   })

   return 0
}

const getPhotoById = (photosTab, id) => {
   photosTab.forEach((item) => {
      if (item.id == id) return item
   })

   return 0
}

const getReqJSON = (req) => {

   return new Promise((resolve, reject) => {
      try {
         let body = ""
         req.on("data", (data) => {
            body = data.toString()
         })

         req.on("end", () => {
            resolve(JSON.parse(body))
         })
      } catch (error) {
         reject(error)
      }
   })
}

const encryptPassword = (password) => {
   return bcrypt.hashSync(password, 8)
}

const decryptPass = (userpass, encrypted) => {
   return bcrypt.compareSync(userpass, encrypted)
}

const verifyToken = (token) => {

   return new Promise( async (resolve, reject) => {
      try {
         let decoded = await jwt.verify(token, process.env.VERY_SECRET_KEY)
         console.log({ decoded: decoded })
         resolve(decoded)
      }
      catch (ex) {
         reject({ message: ex.message })
      }
   })
}

module.exports = { getTagByName, getPhotoById, getReqJSON, encryptPassword, decryptPass, verifyToken }