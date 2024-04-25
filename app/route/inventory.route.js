const express = require('express');
const app = express.Router();
const multer = require('multer');
const productController = require('../controller/product.controller');
const authMiddleware = require('../middleware/auth.middleware');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = __dirname + '/../public/images/products';
        fs.mkdirSync(uploadDir, {recursive: true});
        cb(null, uploadDir);

    },
    filename: function(req, file, cb) {
        const date = new Date();
        const imageExt = path.extname(file.originalname);
        const storedFilename = `product-at-${date.getTime()}${imageExt}`;
        cb(null, storedFilename);
    }

});

const upload = multer({ storage: storage });

app.post('/update/:id', authMiddleware.roleAuth, upload.single('productImage'), productController.update);
// app.use('/delete/:id', productController.delete);
app.use('/delete', authMiddleware.roleAuth, productController.deleteProducts);

app.get('/search', productController.search);
app.get('/detail/:id', productController.detail);
app.get('/add', authMiddleware.roleAuth, productController.add);
app.post('/add', authMiddleware.roleAuth, upload.single('productImage'), productController.handleAdd);
app.use('/', productController.index);

module.exports = app;
