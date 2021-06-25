const express = require("express");
const { requireSignin, userMiddleware, adminMiddleware } = require("../com_middleware");
const { addItemToCart, getCartItems } = require("../controllers/cart");
const Router = express.Router();


Router.post('/user/cart/addtocart', requireSignin, userMiddleware, addItemToCart);
Router.get('/user/cart/getcartitems', requireSignin, userMiddleware, getCartItems);
//   requireSignin, userMiddleware,

//new update
router.post("/user/cart/removeItem", requireSignin, userMiddleware, removeCartItems);

module.exports = Router;