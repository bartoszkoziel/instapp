const fileController = require("./imgController")
const tagsController = require("./tagsController")
const logger = require("tracer").colorConsole()

const router = (req, res) => {
    // IMG ROUTER
    if(req.url.search("/api/photos") != -1) {
        if(req.method == "POST" && req.url == "/api/photos"){
            fileController.saveImg(req, res)
            logger.info("POST /api/photos")
        }
        else if(req.method == "GET" && req.url == "/api/photos"){
            fileController.getImg(res, -1)
            logger.info("GET /api/photos")
        }
        else if(req.method == "GET" && req.url.match(/\/api\/photos\/([0-9]+)/)){
            let id = req.url.split("/")[3]
            fileController.getImg(res, id)
            logger.info("GET /api/photos/" + id)
        }
        else if(req.method == "DELETE" && req.url.match(/\/api\/photos\/([0-9]+)/)){
            let id = req.url.split("/")[3]
            fileController.delImg(res, id)
            logger.info("DELETE /api/photos/" + id)
        }
        else if(req.method == "PATCH" && req.url.match(/\/api\/photos\/([0-9]+)/)){
            let id = req.url.split("/")[3]
            fileController.patchImg(req, res, id)
            logger.info("PATCH /api/photos/" + id)
        }
    } 

    // TAGS ROUTER
    else if(req.url.search("/api/tags/raw") != -1) {
        if(req.method == "GET" && req.url == "/api/tags/raw") {
            tagsController.getTagsRaw(res)
            logger.info("GET /apt/tags")
        }
    }

}

module.exports = router