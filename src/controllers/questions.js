const path = require('path');
const fs = require('fs');
const sentQuestions = (req, res , next) => {
 
      res.status(200).sendFile(path.join(__dirname, '..', 'data.json'));
    

};

module.exports = sentQuestions;
