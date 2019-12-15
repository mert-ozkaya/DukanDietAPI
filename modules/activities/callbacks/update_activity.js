const ObjectID = require('mongodb').ObjectID;
module.exports = function(req,res) {



    let collection = req.app.get('DB').collection('activities');
    let filter = {
      "_id": ObjectID(req.params._id)
    }

    console.log(filter._id)

    let update = {
      $set:{
        weightOfDay: parseInt(req.body.weight),
        dietStatus: parseInt(req.body.status),
        physicalActivities: parseInt(req.body.physicalActivities),
        measurements: {
          chest: parseInt(req.body.chest),
          waist: parseInt(req.body.waist),
          buttocks: parseInt(req.body.buttocks)
        },
        notes: req.body.notes,
        menu: req.body.menu
      }



    }

    let p = collection.findOneAndUpdate(filter,update)
    p.then(function(result){
      res.send('Güncelleme başarılı')
    }).catch(function(err) {
        console.log(err)
        res.status(500).send(err);
    })
}
