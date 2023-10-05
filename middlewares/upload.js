const multer = require('multer');
const path = require('path');

const destination = path.resolve('temp');

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniquePreffix = `${Data.now()}_${Math.round(Math.random() * 1E9)}`;
        const filename = `${uniquePreffix}_${file.originalname}`;
        cb(null, filename);
    }
});

const limits = {
    fileSize: 5 * 1024 * 1024
};

const fileFilter = (req, res, cb) => {
    if (file.originalname.split('.').pop() === 'exe') {
    cb(new Error('File extention not allow'));
    }
    cb(null, filename);
}

const upload = multer({
    storage,
    limits,
    fileFilter
});

module.exports = {
  upload,
};