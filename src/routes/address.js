const express = require("express");
const { requireSignin, userMiddleware } = require("../com_middleware");
const { getAddress, addAddress } = require("../controllers/address");
const Router = express.Router();


Router.post('/user/address/create', requireSignin, userMiddleware, addAddress);
Router.post('/user/getaddress', requireSignin, userMiddleware, getAddress);
//   requireSignin, userMiddleware,
module.exports = Router;