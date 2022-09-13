import path from 'path';
import express from 'express';
import multer from 'multer';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'frontend/public/images');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const checkFileType = (file, cb) => {
    const filetypes = /jpg|jpeg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)


    if(extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Image only!');
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    },
    preservePath: true
})

router.post("/", protect, admin, upload.single('image'), (req, res) => {
    console.log(`/images/${req.file.filename}`);
    res.send(`/images/${req.file.filename}`);
})

export default router;