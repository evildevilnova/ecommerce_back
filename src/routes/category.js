const express = require("express");
const { requireSignin, adminMiddleware } = require("../com_middleware");
const { addCategory, getCategories, deleteCategories } = require("../controllers/category");
const Router = express.Router();
const shortid = require('shortid');
const path = require('path'); 
const multer = require('multer');
const { updateCategories } = require("../controllers/category");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname)+'/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
var upload = multer({ storage: storage })

Router.post('/category/create', requireSignin,  adminMiddleware, upload.single('categoryImage'), addCategory);
Router.get('/category/getcategory', getCategories);
Router.post('/category/update', upload.array('categoryImage'), updateCategories);
Router.post('/category/delete', deleteCategories);

module.exports = Router;