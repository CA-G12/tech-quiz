const path = require('path');
const fs = require('fs');

require('dotenv').config();

const fetch = require('node-fetch');

const handleData = (req, res) => {
  const { category, difficulty } = req.query;

  const filePath = path.join(__dirname, '..', 'data.json');
  fetch(`https://quizapi.io/api/v1/questions?category=${category}&difficulty=${difficulty}`, {
    headers: new Headers({
      'X-Api-Key': process.env.API_KEY,
    }),
  })
    .then((jsonData) => jsonData.json())
    .then((data) => {
      fs.writeFile(filePath, JSON.stringify(data), { encoding: 'utf-8' }, (err) => {
        if (err) console.log(err);
      });
    });
  res.status(200).sendFile(path.join(__dirname, '..', '..', 'public', 'quiz.html'));
};

module.exports = handleData;
