const formidable = require("formidable")
const path = require("path")
const fs = require("fs")

const tagsModel = require("./tagsModel")
let { photosTab, currId } = require("./imgModel")
const utils = require("./utils")

const saveImg = (req, res) => {
    const form = formidable({ multiples: true, uploadDir: path.join(__dirname, "upload"), keepExtensions: true })

    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
            res.end(String(err))
            return
        } else {
            let photodata = {
                id: currId,
                album: fields.album,
                originalName: files.name,
                url: files.file.path,
                lastChange: "original",
                history: [
                    {
                        status: "original",
                        timestamp: files.file.lastModifiedDate
                    }
                ],
                tags: []
            }

            photosTab.push(photodata)
            currId++
            res.writeHead(200)
            res.end()
        }
    })
}

const getImg = (res, id) => {
    if (id == -1) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(photosTab, null, 2))
    } else {
        photosTab.forEach((item) => {
            if (item.id == id) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(item, null, 2))
            }
        })
    }
}

const delImg = (res, id) => {
    photosTab.forEach((item) => {
        if (item.id == id) {
            fs.rmSync(item.url)
            let index = photosTab.indexOf(item)
            photosTab.splice(index, 1)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end()
            return
        }
    })
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end()
    return
}

const patchImg = (req, res, id) => {
    photosTab.forEach((item) => {
        if (item.id == id) {
            let temphist = item.history.length + 1
            item.history.push({
                status: "zmienione " + temphist,
                timestamp: Date.now()
            })
            item.lastChange = "zmienione " + temphist

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end()
            return
        }
    })

    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end()
    return
}

// DO POPRAWY CALA CZĘŚĆ Z OTAGOWANIEM ZDJEC!!!

const tagImg = (req, res, imgId) => {

    let nazwaTagu = ""
    req.on("data", (data) => {
        nazwaTagu = data.toString()
    })

    req.on("end", () => {
        nazwaTagu = JSON.parse(nazwaTagu).name
        let tagObj = tagsModel.tagsTab.find(el => el.name == nazwaTagu)

        if (tagObj == undefined) {
            tagsModel.tagsTab.push({
                id: tagsModel.currId,
                name: nazwaTagu,
                popularity: 1
            })

            let img = photosTab.find(el => el.id == imgId)
            img.tags.push({
                name: nazwaTagu,
                popularity: 1
            })

            currId++
        }

        else {

            let img = photosTab.find(el => el.id == imgId)
            img.tags.push({
                name: tagObj.name,
                popularity: tagObj.popularity + 1
            })
        }

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end()
    })
}

const getImgTags = (res, id) => {
    let photo = utils.getPhotoById(photosTab, id)

    if (photo != 0) {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
            id: photo.id,
            tags: photo.tags
        }, null, 2))
        return
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end()
    return
}

module.exports = { saveImg, getImg, delImg, patchImg, getImgTags, tagImg }