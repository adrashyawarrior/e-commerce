const express = require('express')
const multer = require('multer')

const productController = require('../controllers/product-controller')

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1])
    }
})

const upload = multer({ storage: storage });

router.get('/:id/edit', productController.edit);
router.get('*', productController.index);
router.post('', upload.single('image'), productController.create);
router.put('/:id', upload.single('image'), productController.update);
router.delete('/:id', productController.destroy);

module.exports = router;