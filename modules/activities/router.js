const Router = require('express').Router;
const router = Router();
const _auth = require('../register/middlewares/auth')

router.get('/', _auth, require('./callbacks/get-activity'))
router.get('/list', _auth, require('./callbacks/list'))
router.post('/update/:_id',_auth, require('./callbacks/update_activity'))
module.exports = router;
