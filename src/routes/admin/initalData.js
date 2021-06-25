const express = require('express');
const { requireSignin, adminMiddleware } = require('../../com_middleware');
const { initialData } = require('../../controllers/admin/initalData');
const router = express.Router();

router.post('/initialdata', initialData);
// requireSignin, adminMiddleware
module.exports = router;