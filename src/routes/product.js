const express = require("express");
const { requireSignin, adminMiddleware } = require("../com_middleware");
const { createProduct, getProductsBySlug, getProductDetailsById } = require("../controllers/product");
const multer = require('multer');
// const upload = multer({ dest: 'uploads/'})
const Router = express.Router();
const shortid = require('shortid');
const path = require('path'); 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname)+'/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
  var upload = multer({ storage: storage })

Router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
Router.get('/products/:slug', getProductsBySlug)
// Router.get('/category/getcategory', getCategories);
Router.get('/product/:productId', getProductDetailsById);

// 
module.exports = Router;