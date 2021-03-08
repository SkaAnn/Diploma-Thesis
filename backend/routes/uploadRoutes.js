import path from 'path'
import fs from 'fs'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log(req.body.userId);
        const dir = `uploads/${req.body.userId}`
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }

        cb(null, dir)
        // cb(null, 'uploads/')
    },

    filename(req, file, cb) {
        console.log('som tu')
        if (file.fieldname === 'avatar') {
            // Set profile photo
            // console.log(`${file.fieldname}${path.extname(file.originalname)}`)
            cb(null, `profile${path.extname(file.originalname)}`)
        } else {
            // Product photos
            console.log('som tu v products photos ')
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
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
    // var file = req.body.photos;
    // res.send('Photos uploaded');
    // console.log(`Req files: ${req.body.photos}`);
});


router.route('/profile').post(upload.single('avatar'), (req, res) => { // mozme i multiple
    res.send(`\\${req.file.path}`)
})

export default router