const express = require('express');
const { upload, requireSignin, adminMiddleware } = require('../../com_middleware');
const { createPage, getPage } = require('../../controllers/admin/Page');
const router = express.Router();

router.post('/page/create',requireSignin, adminMiddleware,upload.fields([
    { name: 'banners'},
    { name: 'products'}
]), createPage);

router.get('/page/:category/:type', getPage);

module.exports = router;