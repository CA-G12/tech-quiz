const router = require('express').Router();

const quizRouter = require('./controllers');
const { error404, serverError } = require('./errors');

router.get('/quiz', quizRouter);
router.use('*', error404);
router.use(serverError);

module.exports = router;
