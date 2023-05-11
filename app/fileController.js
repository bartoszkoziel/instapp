const formidable = require("formidable")
const path = require("path")
const fs = require("fs")

const saveImg = (req, res) => {
    const form = formidable({multiples: true, uploadDir: path.join(__dirname, "upload"), keepExtensions: true})

    form.parse(req, (err, fields, files) => {
        if(err){
            res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
            res.end(String(err));
            return;
        }
        let oldpath = files.file.path
        let newpath = path.join(__dirname, "upload", files.file.name)
        fs.renameSync(oldpath, newpath)

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ fields, files }, null, 2));
    })

    return
}

module.exports = {saveImg}