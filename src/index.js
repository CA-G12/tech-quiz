const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`The application is listening on port: ${app.get('port')}, and ready to accept requests!`);
});
