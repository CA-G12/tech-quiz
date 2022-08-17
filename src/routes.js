const router = require('express').Router();

const quizRouter = require('./controllers');

router.get('/quiz', quizRouter);

module.exports = router;
