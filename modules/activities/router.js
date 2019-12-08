const Router = require('express').Router;
const router = Router();
const _auth = require('../register/middlewares/auth')

router.get('/', _auth, require('./get-activity'))


module.exports = router;
