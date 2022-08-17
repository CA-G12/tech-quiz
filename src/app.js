const path = require('path');

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(compression());
app.use(helmet.contentSecurityPolicy({ useDefaults: true, directives: { 'img-src': ["'self'", 'https: data:'] } }));

module.exports = app;
