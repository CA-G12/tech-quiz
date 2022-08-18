const app = require('./app');

app.listen(app.get('port'), (err) => {
  if (err) console.log(err);
  console.log(`The application is listening on port: ${app.get('port')}, and ready to accept requests!`);
});
