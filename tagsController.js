const formidable = require("formidable")

let { tagsTab, currId } = require("./tagsModel")
const utils = require("./utils")

const getTagsRaw = (res) => {
    let tempTab = []
    tagsTab.forEach((item) => {
        tempTab.push(item.name)
    })

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(tempTab, null, 2))
}

const getTags = (res, id) => {
    if (id == -1) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(tagsTab, null, 2))
    } else {
        tagsTab.forEach((item) => {
            if (item.id == id) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(item, null, 2))
            }
        })
    }
}

const addTag = (req, res) => {
    let body = ""
    req.on("data", (data) => {
        body = data.toString()
    })

    req.on("end", () => {
        body = JSON.parse(body)

        if (tagsTab.find(el => el.name == body.name) == undefined) {
            tagsTab.push({
                id: currId,
                name: body.name,
                popularity: body.popularity
            })

            currId++

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end()
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end()
        }
    })
}

module.exports = { getTagsRaw, getTags, addTag }