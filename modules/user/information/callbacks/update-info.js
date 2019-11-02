module.exports = [setInfo]


function setInfo(req,res) {

  let collection = req.app.get('DB').collection('userInformation');
  let filter = {user_id: req.user._id};

  let userInfo = {
    given_name: req.body.given_name,
    family_name: req.body.family_name,
    birthdate: req.body.birthdate
  }

  let update = {
    $set: {
      given_name: req.body.given_name,
      family_name: req.body.family_name,
      birthdate: req.body.birthdate
    }
  };

  let p = collection.findOneAndUpdate(filter, update);
  p.then(result => {
    if(result.value == null)
    {
        let p1 = collection.insertOne(userInfo)
        p1.then(result1 => {
          res.status(200).json(result1);
        }).catch( error => {
          res.status(500).json(error);
        })
    }
    console.log("result",result)
    res.sendStatus(200);
  }).catch(error => {
    res.status(500).json(error);
  });

}
