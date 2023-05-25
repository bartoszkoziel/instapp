const utils = require("./utils")

let {usersTab, currId} = require("./userModel")

const register = async (req, res) => {
    let userObj = await utils.getReqJSON(req)

    console.log(userObj)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(userObj))
}

module.exports = {register}