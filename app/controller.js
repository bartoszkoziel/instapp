const formidable = require("formidable")
const path = require("path")
const fs = require("fs")

let { photosTab, currId } = require("./model")

const saveImg = (req, res) => {
    const form = formidable({ multiples: true, uploadDir: path.join(__dirname, "upload"), keepExtensions: true })

    let status = 1
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' })
            res.end(String(err))
            return
        } else {
            console.log(files)
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
                ]
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
        res.end(JSON.stringify(photosTab), null, 2)
    } else {
        photosTab.forEach((item) => {
            if (item.id == id) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(item), null, 2)
            }
        })
    }
}

const delImg = (res, id) => {
    photosTab.forEach((item) => {
        if(item.id == id) {
            fs.rmSync(item.url)
            let index = photosTab.indexOf(item)
            photosTab.splice(index, 1)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end()
        }
    })
}

module.exports = { saveImg, getImg, delImg }