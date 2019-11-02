const express = require('express');
const bodyParser =require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
  req.data = {};
  next();
});

app.use('/register', require('./modules/register/router'))
app.use('/user', require('./modules/register/middlewares/auth'), require('./modules/user/router'))
module.exports = app;
