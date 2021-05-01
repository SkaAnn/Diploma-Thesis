import path from 'path'
import fs from 'fs'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const dir = `uploads/${req.body.userId}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        cb(null, dir)
    },

    filename(req, file, cb) {
        if (file.fieldname === 'avatar') {
            cb(null, `profile-${Date.now()}${path.extname(file.originalname)}`)     // Set profile photo
        } else {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)   // Set product photos
        }
    }
})

function checkFileType(file, cb) {
    const filetypes = /jpg|jpeg|png/
    // obe true or false, ci to patri do filetypes
    const extname = filetypes.test(path.extname(file.originalname.toLowerCase()))
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Images only!')
    }
}

const upload = multer({
    storage,
    // kontrola typu suborov - chceme uploadovat len .jpg, .png
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb)
    }
})

// @rootRoute   /api/upload
router.route('/photos').post(upload.array('photos', 10), function (req, res) {
    const arr = []
    for (var i = 0; i < req.files.length; i++) {
        arr.push(`/uploads/${req.body.userId}/${req.files[i].filename}`)
    }
    res.send(arr)
});


router.route('/profile').post(upload.single('avatar'), (req, res) => { 
    res.send(`\\${req.file.path}`)
})

export default router