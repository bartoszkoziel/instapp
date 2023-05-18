const { tagsTab, currId } = require("./tagsModel")

const getTagsRaw = (res) => {
    let tempTab = []
    tagsTab.forEach((item) => {
        tempTab.push(item.name)
    })

    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(tempTab), null, 2)
}

const getTags = (res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(tagsTab), null, 2)
}

module.exports = { getTagsRaw }