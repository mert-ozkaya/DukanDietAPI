const Router = require('express').Router;
const router = Router();


router.get('/',require('./callbacks/get-reco'))
router.post('/new',require('./callbacks/new'))

module.exports = router;
