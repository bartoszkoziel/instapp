const utils = require("./utils")
const jwt = require("jsonwebtoken")
const path = require("path")
require("dotenv").config()

let { usersTab, currId } = require("./userModel")

const register = async (req, res) => {
    let reqUser = await utils.getReqJSON(req)

    if (usersTab.find(el => el.email == reqUser.email) != undefined) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end("user already exists for this email")
        return
    }

    let userObj = {
        id: currId,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        email: reqUser.email,
        password: utils.encryptPassword(reqUser.password),
        pfp: path.join(__dirname, "pfp", "default.jpg"),
        confirmed: false
    }

    usersTab.push(userObj)
    currId++

    let token = await jwt.sign(userObj, process.env.VERY_SECRET_KEY, { expiresIn: "50s" })

    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end("PLEASE CONFIRM YOUR ACCOUNT WITH THIS LINK \n http://localhost:3000/api/user/confirm/" + token)
}

const verify = async (res, token) => {
    try {
        let decoded = await jwt.verify(token, process.env.VERY_SECRET_KEY)
        usersTab.find(el => el.id == decoded.id).confirmed = true

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end()

    } catch (ex) {
        console.log({ message: ex.message })
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end(ex.message)
        return
    }
}

const login = async (req, res) => {
    let credentials = await utils.getReqJSON(req)
    let userCurr = usersTab.find(el => el.email == credentials.email)

    if (userCurr == undefined || userCurr.confirmed != true || !utils.decryptPass(credentials.password, userCurr.password)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' })
        res.end("user not found or not confirmed")
        return
    }

    let token = await jwt.sign(userCurr, process.env.VERY_SECRET_KEY, { expiresIn: "12h" })

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({token: token}))

}

const getAllUsers = (res) => {
    try {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(usersTab))
    }

    catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end()
    }
}

module.exports = { register, verify, getAllUsers, login }