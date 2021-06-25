const { Router } = require('express');
const express = require('express');
const { sign } = require('jsonwebtoken');
const { signout } = require('../controllers/admin/uath');
const { signup, signin, requireSignin } = require('../controllers/uath');
const router = express.Router();
const { validateRequest, validatesigninRequest, isRequestValidated } = require('../validator/auth');


router.post('/signin', validatesigninRequest, isRequestValidated, signin);
router.post('/signup', validateRequest, isRequestValidated, signup);
router.post('/signout', isRequestValidated, signout );

// router.post('/profile', requireSignin, (req, res) => {
//     res.status(200).json({ user : "profile"});
// })

// 

module.exports = router;