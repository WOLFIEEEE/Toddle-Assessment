const express = require('express');

const {
    login
} = require('./api_desc');

const {
    verifyToken,
    verifyUserWithToken,
} = require('../jwtvalidaation/verify');

const router = express.Router();

router.post('/login', login);

module.exports = router;