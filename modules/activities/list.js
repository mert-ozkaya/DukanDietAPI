const ObjectID = require('mongodb').ObjectID

module.exports = function(req,res) {

  let user_id = ObjectID(req.user._id)
  let pipeline = [
    {
      '$match': {
        'user_id': ObjectID(user_id)
      }
    }
  ]

  let collection = req.app.get('DB').collection('activities');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray()

  p.then((result) => {

    if(result) res.send(result)
    else res.sendStatus(400)

  }).catch((err) => {
    res.status(500).send('db-error');
  })




}
