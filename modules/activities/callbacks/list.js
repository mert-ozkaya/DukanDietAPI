const ObjectID = require('mongodb').ObjectID

module.exports = function(req,res) {

  let user_id = ObjectID(req.user._id)
  let pipeline = [
    {
      '$match': {
        'user_id': ObjectID(user_id)
      }
    },
    {
      '$project': {
        '_id': 1,
        'date': 1,
        'phase': 1,
        'foodCategory': 1
      }
    }
  ]
  console.log("list")
  let collection = req.app.get('DB').collection('activities');
  let cursor = collection.aggregate(pipeline)
  let p = cursor.toArray()

  p.then((result) => {

    if(result) res.send(result)
    else res.status(400).send("Kayıt başarısız")

  }).catch((err) => {
    res.status(500).send('db-error');
  })
}
