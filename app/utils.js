const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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

module.exports = { getTagByName, getPhotoById, getReqJSON, encryptPassword, decryptPass }