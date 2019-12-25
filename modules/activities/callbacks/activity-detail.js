const ObjectID = require('mongodb').ObjectID
const validator = require('validator')
const moment = require('moment')

module.exports = function(req,res) {

      let filter = {
         '_id': ObjectID(req.params._id)
      }

    let collection = req.app.get('DB').collection('activities');
    let p = collection.findOne(filter)

    p.then((result) => {
      if(result) res.send(result)
      else res.sendStatus(400)
    }).catch((err) => {
      res.sendStatus(500).send('db-error');
    })

}
