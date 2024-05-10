const express = require('express');
const app = express.Router();
const userController = require('../controller/user.controller');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const uploadDir = __dirname + '/../public/images/users';
        fs.mkdirSync(uploadDir, {recursive: true});
        cb(null, uploadDir);

    },
    filename: function(req, file, cb) {
        const date = new Date();
        const imageExt = path.extname(file.originalname);
        const storedFilename = `user-at-${date.getTime()}${imageExt}`;
        cb(null, storedFilename);
    }

});

const upload = multer({ storage: storage });

app.get('/', userController.updateInfo);
app.post('/update',upload.single('profilePicture'), userController.handleUpdateInfo);

module.exports = app;