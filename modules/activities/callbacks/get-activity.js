const ObjectID = require('mongodb').ObjectID
const validator = require('validator')
const moment = require('moment')

module.exports = function(req,res) {

    //console.log(req.body
    let user_id = ObjectID(req.user._id)

    let pipeline = [
      {
        '$match': {
          '_id': ObjectID(user_id)
        }
      }, {
        '$lookup': {
          'from': 'activities',
          'localField': '_id',
          'foreignField': 'user_id',
          'as': 'activity'
        }
      },
      { '$unwind' : "$activity"},
      {"$unwind":"$activity.date"},
      {"$match":{"activity.date": moment().format().split('T')[0] }}

    ]

    let collection = req.app.get('DB').collection('users');
    let cursor = collection.aggregate(pipeline)
    let p = cursor.toArray()


    p.then((result) => {
      let data = {
        _id: result[0].activity._id,
        name: result[0].given_name,
        date: result[0].activity.date,
        weight: result[0].weight,
        weightOfDay: result[0].activity.weightOfDay,
        physical_activity: result[0].activity.physicalActivities,
        phase: result[0].activity.phase,
        menu: result[0].activity.menu,
        kaybettigi_kilo: parseInt(result[0].lost_weight), //kaybettiği kilo
        kaybedecegi_kilo: parseInt(result[0].toplamVerilecekKilo - result[0].lost_weight), // kaybedeceği kilo
        foodCategory: result[0].activity.foodCategory,
        chest: result[0].activity.measurements.chest,
        waist: result[0].activity.measurements.waist,
        buttocks: result[0].activity.measurements.buttocks,
        note: result[0].activity.notes
      }

      let new_date = data.date.split('-')
      data.date = new_date[2] + '/' + new_date[1] + '/' + new_date[0]

      if(result) res.send(data)
      else res.sendStatus(400)

    }).catch((err) => {
      res.status(500).send('db-error');
    })

}
