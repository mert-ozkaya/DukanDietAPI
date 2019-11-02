const Router = require('express').Router;

const router = Router();

router.get('/get', require('./callbacks/get-info'));
router.post('/post', require('./callbacks/post-info'))
module.exports = router;
