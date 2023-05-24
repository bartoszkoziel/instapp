const http = require("http")
const router = require("./app/router")
require("dotenv").config()

const server = http.createServer((req, res) => { router(req, res) })
server.listen(process.env.APP_PORT, () => {
    console.log("running on port", process.env.APP_PORT)
})