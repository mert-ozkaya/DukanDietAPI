const express = require('express');
const bodyParser =require('body-parser');
const debug = require('debug')('DukanDiet-api:app');
const moment = require('moment');
const app = express();


app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({ extended: false }))

// request debugger
app.use(function(req, res, next) {
  debug('%s %s - (%s) %s', moment().format(), req.ip, req.method, req.originalUrl);
  next();
});

app.use(function(req, res, next) {
  req.data = {now: moment()};
  next();
});

app.use('/register', require('./modules/register/router'))
app.use('/recommendation',require('./modules/recommendation/router'))
app.use('/activities',require('./modules/activities/router'))

app.use('/test', function(req,res) {
    //let son =  moment().add(4, 'days').format('dddd');
    //var date = moment(son, "DD/MM/YYYY").format();
    let date = moment().format().split('T')[0];
    res.send(date)
})

module.exports = app;
