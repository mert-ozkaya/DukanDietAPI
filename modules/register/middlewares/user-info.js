const ObjectID = require('mongodb').ObjectID;
const moment = require('moment');

module.exports = [
  setInfo,
  calculateDietProgram,
  attackPhase,
  cruisePhase,
  consolidationPhase,
  saveGeneralInfo,
  createActivities
]

function setInfo(req,res,next) {


  let weight = parseInt(req.body.weight)
  let height = parseInt(req.body.height)
  let bone_structure = parseInt(req.body.bone_structure)

  let dateArray = req.body.birthdate.split('/')
  let birthYear = dateArray[2] // doğum yılı çekildi

  let fullNowDate = req.data.now.format('l') //günün tarihi '12/8/2019' formatına dönüştürüldü
  let nowArray = fullNowDate.split('/')
  let nowYear = nowArray[2]

  let age = nowYear - birthYear

  let bmi = weight / ((height/100) * (height/100))

  let userInfo = {
    email: req.body.email,
    password: req.body.password,
    given_name: req.body.given_name,
    family_name: req.body.family_name,
    birthdate: req.body.birthdate,
    age: age,
    weight: weight,
    height: height,
    bone_structure: bone_structure, //kemik yapısı
    number_of_pregnancies: req.body.number_of_pregnancies, // doğum sayısı
    bmi: bmi,
    gender: req.body.gender,
    lost_weight: 0,
    created_at: moment().format()
  }

  req.data.userInfo = userInfo

  next()
}


function calculateDietProgram(req,res,next) {
  console.log("calculateDietProgram")
  let age = req.data.userInfo.age
  let height = req.data.userInfo.height
  let weight = req.data.userInfo.weight
  let bmi = req.data.userInfo.bmi

  let altIdealKilo = 18.5 * (height/100) * (height/100)
  let ustIdealKilo = 25 * (height/100) * (height/100)

  let idealKilo = (altIdealKilo + ustIdealKilo)/2
  req.data.userInfo.idealKilo = idealKilo
  req.data.userInfo.altIdealKilo = altIdealKilo
  req.data.userInfo.ustIdealKilo = ustIdealKilo
  req.data.userInfo.toplamVerilecekKilo =  weight - idealKilo

  if(age < 19 ) {
    res.status(400).json({
      message: "18 yaşından küçüklere diyet programı oluşturulmamaktadır."
    })
  }else if(age > 19 && age <= 24){
    if(bmi<19){
      res.status(400).json({
        message:"Dukan diyeti kilo vermek içindir. Sizin kilo almaya ihtiyacınız vardır."
      })
    }else if(bmi >= 19 && bmi <= 24){
      res.status(400).json({
        message:"Diyete ihtiyacınız yoktur.Gayet formdasınız."
      })
    }else if(bmi > 24 && bmi <= 30){
        req.data.userInfo.kiloKategori = 1
      next()
    }else if(bmi > 30 && bmi <= 35){
      req.data.userInfo.kiloKategori = 2
      next()
    }else if(bmi > 35 && bmi <= 40) {
      req.data.userInfo.kiloKategori = 3
      next()
    }else {
      req.data.userInfo.kiloKategori = 4
      next()
    }
  }else if(age > 24 && age <= 34){
    if(bmi<20){
      res.status(400).json({
        message:"Dukan diyeti kilo vermek içindir. Sizin kilo almaya ihtiyacınız vardır."
      })
    }else if(bmi >= 20 && bmi <= 25){
      res.status(400).json({
        message:"Diyete ihtiyacınız yoktur.Gayet formdasınız."
      })
    }else if(bmi > 25 && bmi <= 30){
      req.data.userInfo.kiloKategori = 1
      next()
    }else if(bmi > 30 && bmi <= 35){
      req.data.userInfo.kiloKategori = 2
      next()
    }else if(bmi > 35 && bmi <= 40) {
      req.data.userInfo.kiloKategori = 3
      next()
    }else {
      req.data.userInfo.kiloKategori = 4
      next()
    }

  }else if(age > 34 && age <= 44){
    if(bmi<21){
      res.status(400).json({
        message:"Dukan diyeti kilo vermek içindir. Sizin kilo almaya ihtiyacınız vardır."
      })
    }else if(bmi >= 21 && bmi <= 26){
      res.status(400).json({
        message:"Diyete ihtiyacınız yoktur.Gayet formdasınız."
      })
    }else if(bmi > 26 && bmi <= 30){
      req.data.userInfo.kiloKategori = 1
      next()
    }else if(bmi > 30 && bmi <= 35){
      req.data.userInfo.kiloKategori = 2
      next()
    }else if(bmi > 35 && bmi <= 40) {
      req.data.userInfo.kiloKategori = 3
      next()
    }else {
      req.data.userInfo.kiloKategori = 4
      next()
    }


  }else if(age > 44 && age <= 54){
    if(bmi<22){
      res.status(400).json({
        message:"Dukan diyeti kilo vermek içindir. Sizin kilo almaya ihtiyacınız vardır."
      })
    }else if(bmi >= 22 && bmi <= 27){
      res.status(400).json({
        message:"Diyete ihtiyacınız yoktur.Gayet formdasınız."
      })
    }else if(bmi > 27 && bmi <= 30){
      req.data.userInfo.kiloKategori = 1
      next()
    }else if(bmi > 30 && bmi <= 35){
      req.data.userInfo.kiloKategori = 2
      next()
    }else if(bmi > 35 && bmi <= 40) {
      req.data.userInfo.kiloKategori = 3
      next()
    }else {
      req.data.userInfo.kiloKategori = 4
      next()
    }

  }else if(age > 54 && age <= 64) {
    if(bmi<23){
      res.status(400).json({
        message:"Dukan diyeti kilo vermek içindir. Sizin kilo almaya ihtiyacınız vardır."
      })
    }else if(bmi >= 23 && bmi <= 28){
      res.status(400).json({
        message:"Diyete ihtiyacınız yoktur.Gayet formdasınız."
      })
    }else if(bmi > 28 && bmi <= 30){
      req.data.userInfo.kiloKategori = 1
      next()
    }else if(bmi > 30 && bmi <= 35){
      req.data.userInfo.kiloKategori = 2
      next()
    }else if(bmi > 35 && bmi <= 40) {
      req.data.userInfo.kiloKategori = 3
      next()
    }else {
      req.data.userInfo.kiloKategori = 4
      next()
    }
  }else {//64 yaşından büyükler için
    if(bmi<24){
      res.staus(400).json({
        message:"Dukan diyeti kilo vermek içindir. Sizin kilo almaya ihtiyacınız vardır."
      })
    }else if(bmi >= 24 && bmi <= 29){
      res.status(400).json({
        message:"Diyete ihtiyacınız yoktur.Gayet formdasınız."
      })
    }else if(bmi > 29 && bmi <= 30){
      req.data.userInfo.kiloKategori = 1
      next()
    }else if(bmi > 30 && bmi <= 35){
      req.data.userInfo.kiloKategori = 2
      next()
    }else if(bmi > 35 && bmi <= 40) {
      req.data.userInfo.kiloKategori = 3
      next()
    }else {
      req.data.userInfo.kiloKategori = 4
      next()
    }
  }

}

function attackPhase(req,res,next) {

    let kiloKategori = req.data.userInfo.kiloKategori

      req.data.userInfo.attachPhase = {}

    if(kiloKategori == 1) {
      req.data.userInfo.attachPhase.durationOfUniverse = 2  //gün
      req.data.userInfo.attachPhase.targetWeight = 1.5 // kg
    }else if(kiloKategori = 2){
      req.data.userInfo.attachPhase.durationOfUniverse = 5  //gün
      req.data.userInfo.attachPhase.targetWeight = 2.5 // kg
    }else if(kiloKategori = 3){
      req.data.userInfo.attachPhase.durationOfUniverse = 6 //gün
      req.data.userInfo.attachPhase.targetWeight = 3  // kg
    }else if(kiloKategori = 4){
      req.data.userInfo.attachPhase.durationOfUniverse = 9  //gün
      req.data.userInfo.attachPhase.targetWeight = 4  // kg
    }else {
      console.log("Kilo kategoride hata var")
    }

    next()
}


function cruisePhase(req,res,next){
  req.data.userInfo.cruisePhase = {}

  let toplamVerilecekKilo = req.data.userInfo.toplamVerilecekKilo
  let atakHedefKilosu = req.data.userInfo.attachPhase.targetWeight

  req.data.userInfo.cruisePhase.durationOfUniverse = parseInt((toplamVerilecekKilo - atakHedefKilosu) * 7)
  req.data.userInfo.cruisePhase.targetWeight = toplamVerilecekKilo - atakHedefKilosu


  next()
}

function consolidationPhase(req,res, next){
  req.data.userInfo.consolidationPhase = {}

  let toplamVerilecekKilo = req.data.userInfo.toplamVerilecekKilo
  req.data.userInfo.consolidationPhase.durationOfUniverse = parseInt(toplamVerilecekKilo * 10)

  next()
}

function saveGeneralInfo(req,res,next){

  req.data.userInfo.created_at = moment().format()

  let collection = req.app.get('DB').collection('users');
  let p = collection.insertOne(req.data.userInfo);
  p.then(result => {
      req.data.user_id = result.insertedId
      next()
  }).catch(error => {
    res.status(500).json(error);
  });
}

function createActivities(req,res,next){
    let array = []
    let atakEvreSuresi = req.data.userInfo.attachPhase.durationOfUniverse
    let seyirEvreSuresi =  req.data.userInfo.cruisePhase.durationOfUniverse
    let guclendirmeEvreSuresi = req.data.userInfo.consolidationPhase.durationOfUniverse

    var day = 0;
    let i

    for(i=0; i<atakEvreSuresi; i++) {
      req.data.day = {}
      req.data.day.user_id = req.data.user_id
      req.data.day.weightOfDay = req.data.userInfo.weight
      req.data.day.dietStatus = 0
      req.data.day.physicalActivities = 0
      req.data.day.measurements = {
        chest: 0,
        waist: 0,
        buttocks:0
      }
      req.data.day.notes = ""
      req.data.day.menu = []
      req.data.day.phase = 0
      req.data.day.foodCategory = "SP"
      req.data.day.date = moment().add(day, 'days').format().split('T')[0];
      day++
      array.push(req.data.day)
    }

    for(i=0; i<seyirEvreSuresi;i++){
      req.data.day = {}
      req.data.day.user_id = req.data.user_id
      req.data.day.weightOfDay = req.data.userInfo.weight
      req.data.day.dietStatus = 0
      req.data.day.physicalActivities = 0
      req.data.day.measurements = {
        chest: 0,
        waist: 0,
        buttocks:0
      }
      req.data.day.notes = ""
      req.data.day.menu = []
      req.data.day.phase = 1
      if(i%2 == 0)
        req.data.day.foodCategory = "PS"
      else if(i%2 == 1)
        req.data.day.foodCategory = "SP"

      req.data.day.date = moment().add(day, 'days').format().split('T')[0];
      day++
      array.push(req.data.day)
    }

    for(i=0; i<guclendirmeEvreSuresi;i++){
      req.data.day = {}
      req.data.day.user_id = req.data.user_id
      req.data.day.weightOfDay = req.data.userInfo.weight
      req.data.day.dietStatus = 0
      req.data.day.physicalActivities = 0
      req.data.day.measurements = {
        chest: 0,
        waist: 0,
        buttocks:0
      }
      req.data.day.notes = ""
      req.data.day.menu = []
      req.data.day.phase = 2
      if(moment().add(day, 'days').format('dddd') == 'Thursday')
        req.data.day.foodCategory = "SP"
      else
        req.data.day.foodCategory = ""
      req.data.day.date = moment().add(day, 'days').format().split('T')[0];
      day++
      array.push(req.data.day)
    }

    for(i=0; i<10;i++){
      req.data.day = {}
      req.data.day.user_id = req.data.user_id
      req.data.day.weightOfDay = req.data.userInfo.weight
      req.data.day.dietStatus = 0
      req.data.day.physicalActivities = 0
      req.data.day.measurements = {
        chest: 0,
        waist: 0,
        buttocks:0
      }
      req.data.day.notes = ""
      req.data.day.menu = []
      req.data.day.phase = 3
      if(moment().add(day, 'days').format('dddd') == 'Thursday')
        req.data.day.foodCategory = "SP"
      req.data.day.date = moment().add(day, 'days').format().split('T')[0];
      day++
      array.push(req.data.day)
    }



    let collection = req.app.get('DB').collection('activities');
    let p = collection.insertMany(array);
    p.then(result => {
      res.send("Kayıt başarıyla oluşturuldu.")
    }).catch(error => {
      res.status(500).json(error);
    });

}
