const fileController = require("./fileController")

const router = (req, res) => {
    if(req.method == "POST" && req.url == "/api/photos"){
        fileController.saveImg(req, res)
        console.log("ADDED PHOTO AND ALBUM")
    }
    else if(req.method == "GET" && req.url == "/api/photos"){}
    else if(req.method == "GET" && req.url.match(/\/api\/tasks\/([0-9]+)/)){}
    else if(req.method == "DELETE" && req.url.match(/\/api\/tasks\/([0-9]+)/)){}
    else if(req.method == "PATCH" && req.url == "/api/photos"){}
}

module.exports = router