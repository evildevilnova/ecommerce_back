const { Router } = require('express');
const express = require('express');
const { sign } = require('jsonwebtoken');
const { adminMiddleware, requireSignin} = require('../../com_middleware');
const { signup, signin, signout } = require('../../controllers/admin/uath');
const { validateRequest, validatesigninRequest, isRequestValidated } = require('../../validator/auth');
const router = express.Router();

//   requireSignin, adminMiddleware,
router.post('/admin/signin',validatesigninRequest, isRequestValidated, signin);
router.post('/admin/signup',validateRequest, isRequestValidated, signup );
router.post('/admin/signout', isRequestValidated, signout );

module.exports = router;