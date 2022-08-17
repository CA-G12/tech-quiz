const supertest = require('supertest');
const app = require('../app');

describe('Testing express routes', (done) => {
  test('Testing "/" route', (done) => {
    supertest(app)
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(typeof res.headers).toBe('object');
        done();
      });
  });
  test('Testing "quiz" route', (done) => {
    supertest(app)
      .get('/quiz')
      .expect(200)
      .end((err, res) => {
        if (err) done(err);
        expect(typeof res.text).toBe('string');
        done();
      });
  });
});
