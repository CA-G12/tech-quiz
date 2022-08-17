const router = require('express').Router();

const { quizRouter, questionsRouter } = require('./controllers');
router.get('/quiz', quizRouter);
router.get('/questions', questionsRouter);

module.exports = router;
