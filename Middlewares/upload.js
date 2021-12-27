const multer = require('multer');
const storage = multer.diskStorage({
    destination:'Images',
    filename:(req, file, cb) => {
        return cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
})

module.exports = upload;