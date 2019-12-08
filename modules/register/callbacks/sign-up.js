const validator = require('validator');
const moment = require('moment');
const _userInformation = require('../middlewares/user-info')

module.exports = [
  validationSignup,
  _userInformation
]

function validationSignup(req, res, next) {
  if(req.body.email === undefined)
    return res.status(400).send('bos-veya-gecersiz-email');

  if(!validator.isEmail(req.body.email))
    return res.status(400).send('gecersiz-email');

  if(req.body.password === undefined)
    return res.status(400).send('bos-veya-gecersiz-sifre');

  if(req.body.password.length < 8)
    return res.status(400).send('sifre-min-8-karakter-olmali');

  if(req.body.password.length > 16)
    return res.status(400).send('sifre-max-8-karakter-olmali');

  if(!req.body.password.match(/\d+/g))
    return res.status(400).send('sifre-en-az-1-sayı-icermeli');


  next();
}
