const express = require('express');

const {
    resize
} = require('./api_desc');
const router = express.Router();

router.post('/resize', resize);

module.exports = router;