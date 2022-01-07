const express = require('express');

const {
    create,
    addQuestion,
    takeSurvey,
    answerSurvey,
    viewResults
} = require('./api_desc.js');

const {
    verifyToken,
    verifyUserWithToken,
} = require('../jwtvalidaation/verify');

const router = express.Router();

router.post('/create', verifyToken, verifyUserWithToken, create);
router.post('/add/:surveyId', verifyToken, verifyUserWithToken, addQuestion);
router.get('/takesurvey/:surveyId', verifyToken, verifyUserWithToken, takeSurvey);
router.post('/ans/:surveyId', verifyToken, verifyUserWithToken, answerSurvey);
router.get('/viewResults/:surveyId', verifyToken, verifyUserWithToken, viewResults);

module.exports = router;