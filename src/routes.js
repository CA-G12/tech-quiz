const router = require('express').Router();

const { quizRouter, questionsRouter } = require('./controllers');
const { error404, serverError } = require('./errors');

router.get('/quiz', quizRouter);
router.get('/questions', questionsRouter);
router.use('*', error404);
router.use(serverError);

module.exports = router;
