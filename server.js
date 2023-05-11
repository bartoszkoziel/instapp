const http = require("http")
const router = require("./app/router")

const server = http.createServer((req, res) => {router(req, res)})
server.listen(3000, ()=> {
    console.log("running on port 3000")
})