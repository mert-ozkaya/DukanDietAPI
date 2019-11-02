const Router = require('express').Router;

const router = Router();

router.use('/information', require('./information/router'));

module.exports = router;
