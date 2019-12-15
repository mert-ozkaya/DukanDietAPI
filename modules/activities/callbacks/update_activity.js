const ObjectID = require('mongodb').ObjectID;
module.exports = [
  update_activity
]


function update_activity(req,res) {

    let collection = req.app.get('DB').collection('activities');
    let filter = {
      "_id": ObjectID(req.params._id)
    }

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
      if(result.value) {
        console.log('result.value',result.value)
        req.data.activity = result.value
        changeWeightOfDay(req)
        res.send('Güncelleme başarılı')
      }
      else res.status(400).send('Güncelleme basarisiz')
    }).catch(function(err) {
        console.log(err)
        res.status(500).send(err);
    })
}

function changeWeightOfDay(req) {
    let filter = {
      "user_id": ObjectID(req.user._id)
    }

    let update = {
      $set:{
        weightOfDay: parseInt(req.body.weight)
      }
    }
  let collection = req.app.get('DB').collection('activities');

  let p = collection.updateMany(filter,update)

    p.then(function(result){
        getLostWeight(req)
    }).catch(function(err) {
        console.log(err)
    })
}

function getLostWeight(req) {
  let filter = {
    "_id": ObjectID(req.data.activity.user_id)
  }

  let collection = req.app.get('DB').collection('users');

  let p = collection.findOne(filter)
    p.then(function(result){
        changeLostWeight(req,result.weight)
    }).catch(function(err) {
        console.log(err)
    })
}


function changeLostWeight(req, weight) {
    let filter = {
      "_id": ObjectID(req.data.activity.user_id)
    }

    let update = {
      $set:{
        lost_weight: parseInt(weight - req.body.weight)
      }
    }
  let collection = req.app.get('DB').collection('users');

  let p = collection.findOneAndUpdate(filter,update)
    p.then(function(result){
        console.log(result)
    }).catch(function(err) {
        console.log(err)
    })
}
