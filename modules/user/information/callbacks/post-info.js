module.exports = [setInfo]


function setInfo(req,res) {

  let collection = req.app.get('DB').collection('userInformation');
  let filter = {user_id: req.user._id};

  let bmi = (req.body.weight) / ((req.body.height/100) * (req.body.height/100))

  if(req.body.phone == null) {
    userInfo.phone = ""
  } else {
    userInfo.phone = req.body.phone
  }

  let userInfo = {
    given_name: req.body.given_name,
    family_name: req.body.family_name,
    birthdate: req.body.birthdate,
    weight: req.body.weight,
    height: req.body.height,
    bone_structure: req.body.bone_structure,
    number_of_pregnancies: req.body.number_of_pregnancies,
    bmi: bmi,
    gender: req.body.gender,
  }

  let p = collection.insertOne(userInfo);
  p.then(result => {
    console.log("result",result)
    res.sendStatus(200);
  }).catch(error => {
    res.status(500).json(error);
  });

}
