const utils = require("./utils")
const formidable = require("formidable")
const path = require("path")
const fs = require("fs")

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
            res.end(ex.message)
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
            res.end(ex.message)
            return
        }

        let newCredentials = await utils.getReqJSON(req)

        let userProfile = usersTab.find(el => el.id == decoded.id)

        if (newCredentials.firstName != undefined && newCredentials.firstName != "") userProfile.firstName = newCredentials.firstName
        if (newCredentials.lastName != undefined && newCredentials.lastName != "") userProfile.lastName = newCredentials.lastName

        res.writeHead(200, { 'Content-Type': 'text/plain' })
        res.end()
        return
    },

    postProfilePicture: async (req, res) => {
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
            res.end(ex.message)
            return
        }

        const form = formidable({ multiples: true, uploadDir: path.join(__dirname, "pfp"), keepExtensions: true })

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
                res.end(String(err))
                return
            } else {

                if (files == undefined || !('file' in files)) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' })
                    res.end("didnt recive a file")
                    return
                }

                let userProfile = usersTab.find(el => el.id == decoded.id)

                userProfile.pfp = files.file.path

                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end()
                return
            }
        })
    },

    logout: async (req, res) => {

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
            res.end(ex.message)
            return
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end()
        return
    },

    getPfp: async (req, res, id) => {
        let userProfile = await usersTab.find(el => el.id == id)

        console.log("ID : ", id)

        if (userProfile == undefined) {
            res.writeHead(400, { 'Content-Type': 'text/plain' })
            res.end("no user")
            return
        }

        let profilePicture = fs.readFileSync(userProfile.pfp)

        res.writeHead(200, { 'Content-Type': 'image/jpg' })
        res.end(profilePicture)

    }
}