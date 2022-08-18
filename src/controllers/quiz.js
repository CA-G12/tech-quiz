const path = require('path');
const fs = require('fs');

require('dotenv').config();

const fetch = require('node-fetch');

const handleData = (req, res, next) => {
  const { category, difficulty } = req.query;

  const filePath = path.join(__dirname, '..', 'data.json');
  fetch(`https://quizapi.io/api/v1/questions?apiKey=${process.env.API_KEY}&category=${category}&difficulty=${difficulty}&limit=10`)
    .then((jsonData) => jsonData.json())
    .then((data) => {
      fs.writeFile(filePath, JSON.stringify(data), { encoding: 'utf-8' }, (err) => {
        if (err) next(err);
      });
    });
  res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', 'quiz.html'), { 'Content-Type': 'text/html' }, (err) => {
    if (err) next(err);
  });
};

module.exports = handleData;
