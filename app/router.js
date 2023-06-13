const fileController = require("./imgController")
const tagsController = require("./tagsController")
const userController = require("./userController")
const profileController = require("./profileController")

const logger = require("tracer").colorConsole()

const router = (req, res) => {
    // IMG ROUTER
    if (req.url.search("/api/photos") != -1) {

        if (req.method == "POST" && req.url == "/api/photos") {
            fileController.saveImg(req, res)
            logger.info("POST /api/photos")
        }

        else if (req.method == "GET" && req.url == "/api/photos") {
            fileController.getImg(res, -1)
            logger.info("GET /api/photos")
        }

        else if (req.method == "GET" && req.url.match(/\/api\/photos\/([0-9]+)/)) {
            let id = req.url.split("/")[3]
            fileController.getImg(res, id)
            logger.info("GET /api/photos" + id)
        }

        else if (req.method == "DELETE" && req.url.match(/\/api\/photos\/([0-9]+)/)) {
            let id = req.url.split("/")[3]
            fileController.delImg(res, id)
            logger.info("DELETE /api/photos" + id)
        }

        else if (req.method == "PATCH" && req.url.match(/\/api\/photos\/([0-9]+)/)) {
            let id = req.url.split("/")[3]
            fileController.patchImg(req, res, id)
            logger.info("PATCH /api/photos" + id)
        }

        else if (req.method == "PATCH" && req.url.match(/\/api\/photos\/tags\/([0-9]+)/)) {
            let id = req.url.split("/")[4]
            fileController.tagImg(req, res, id)
            logger.info("PATCH /api/photos/tags/" + id)
        }

        else if (req.method == "GET" && req.url.match(/\/api\/photos\/tags\/([0-9]+)/)) {
            let id = req.url.split("/")[4]
            fileController.getImgTags(res, id)
            logger.info("GET /api/photos/tags/" + id)
        }
    }

    // TAGS ROUTER
    else if (req.url.search("/api/tags") != -1) {

        if (req.method == "GET" && req.url == "/api/tags/raw") {
            tagsController.getTagsRaw(res)
            logger.info("GET /api/tags/raw")
        }

        else if (req.method == "GET" && req.url == "/api/tags") {
            tagsController.getTags(res, -1)
            logger.info("GET /api/tags")
        }

        else if (req.method == "GET" && req.url.match(/\/api\/tags\/([0-9]+)/)) {
            let id = req.url.split("/")[3]
            tagsController.getTags(res, id)
            logger.info("GET /api/tags/" + id)
        }

        else if (req.method == "POST" && req.url == "/api/tags") {
            tagsController.addTag(req, res)
            logger.info("POST /api/tags")
        }
    }

    // USER ROUTER
    else if (req.url.search("/api/user") != -1) {
        if (req.method == "POST" && req.url == "/api/user/register") {
            userController.register(req, res)
            logger.info("POST /api/user/register")
        }

        else if (req.method == "GET" && req.url.match(/\/api\/user\/confirm\/(.*)/)) {
            let token = req.url.split("/")[4]
            userController.verify(res, token)
            logger.info("GET /api/user/confirm")
        }

        else if (req.method == "POST" && req.url == "/api/user/login") {
            userController.login(req, res)
            logger.info("POST /api/user/login")
        }

        else if (req.method == "GET" && req.url == "/api/user") {
            userController.getAllUsers(res)
            logger.info("GET /api/user")
        }
    }

    // PROFILE ROUTER
    else if (req.url.search("/api/profile") != -1) {
        if (req.method == "GET" && req.url == "/api/profile") {
            profileController.getProfile(req, res)
            logger.info("GET /api/profile")
        }

        else if (req.method == "PATCH" && req.url == "/api/profile") {
            profileController.patchProfile(req, res)
            logger.info("PATCH /api/profile")
        }

        else if (req.method == "POST" && req.url == "/api/profile") {
            profileController.postProfilePicture(req, res)
            logger.info("POST /api/profile")
        }

        else if(req.method == "GET" && req.url == "/api/profile/logout") {
            profileController.logout(req, res)
            logger.info("GET /api/profile/logout")
        }

        else if(req.method == "GET" && req.url.match(/\/api\/profile\/pfp\/([0-9]+).*/)) {
            let id = req.url.split("/")[4][0]
            profileController.getPfp(req, res, id)
            logger.info("GET /api/profile/pfp")
        }
    }
}

module.exports = router