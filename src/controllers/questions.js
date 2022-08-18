const path = require('path');

const fs = require('fs');

const sentQuestions = (req, res, next) => {
  const filePath = path.join(__dirname, '..', 'data.json');
  fs.readFile(filePath, (err, data) => {
    if (err) next(err);
    res.status(200).json(JSON.parse(data.toString()));
  });
};

module.exports = sentQuestions;
