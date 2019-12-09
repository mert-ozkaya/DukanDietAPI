const Router = require('express').Router;
const router = Router();
const _auth = require('../register/middlewares/auth')

router.get('/', _auth, require('./get-activity'))
router.get('/list', _auth, require('./list'))
router.post('/update/:_id',_auth,require('./update_activity'))
module.exports = router;
