const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const multer = require('multer');
const upload = multer();

router.get('/', controller.getProducts);
router.post('/', controller.createProduct);
router.post('/bulk-from-csv-url', controller.bulkFromCSVUrl);
router.post('/bulk-upload-csv', upload.single('file'), controller.bulkUploadCSVFile);
router.delete('/:id', controller.deleteProduct);

module.exports = router;
