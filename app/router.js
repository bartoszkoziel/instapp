const fileController = require("./controller")
const logger = require("tracer").colorConsole()

const router = (req, res) => {
    if(req.method == "POST" && req.url == "/api/photos"){
        fileController.saveImg(req, res)
        logger.info("ADDED PHOTO AND ALBUM")
    }
    else if(req.method == "GET" && req.url == "/api/photos"){
        fileController.getImg(res, -1)
        logger.info("SENT ALL THE PHOTOS TO CLIENT")
    }
    else if(req.method == "GET" && req.url.match(/\/api\/photos\/([0-9]+)/)){
        let id = req.url.split("/")[3]
        fileController.getImg(res, id)
        logger.info("SENT PHOTO", id, "TO CLIENT")
    }
    else if(req.method == "DELETE" && req.url.match(/\/api\/tasks\/([0-9]+)/)){
        let id = req.url.split("/")[3]
        fileController.delImg(res, id)
        logger.info("DELETED PHOTO", id)
    }
    else if(req.method == "PATCH" && req.url == "/api/photos"){}
}

module.exports = router