module.exports = function(req,res) {

  let data = [{
      phase: 0,
      workout: "Günde en az 20 dk yürüyüş ve fiziksel egzersiz.",
      oat: "Günde 1.5 yemek kaşığı yulaf kepeği.",
      water: "Günde 1.5 - 2 litre su (çay ve kahve dahil)",
      allowedFoods: "SINIRSIZ protein (72 Hayvansal besin için geçerli)"
    },
    {
      phase: 1,
      workout: "Günde en az 30 dk yürüyüş ve fiziksel egzersiz",
      oat: "Günde 2 yemek kaşığı yulaf kepeği.",
      water: "Günde 1.5 - 2 litre su (çay ve kahve dahil)",
      allowedFoods: "72 farklı hayvansal besine ek olarak 28 sebze türü."
    },
    {
      phase: 2,
      workout: "Günde en az 25 dk yürüyüş ve fiziksel egzersiz",
      oat: "Günde 2.5 yemek kaşığı yulaf kepeği.",
      water: "Günde 1.5 litre su (çay ve kahve dahil)",
      allowedFoods: [
        "Doğal proteinlerle zengin 72 besin",
        "1 porsiyon meyve",
        "2 dilim tam tahıllı ekmek",
        "40 GR(kibrit kutusu kadar) ÇOK YAĞLI OLMAYAN SERT PEYNİR."
      ]
    },
    {
      phase: 3,
      workout: "Günde en az 20 dk yürüyüş ve fiziksel egzersiz",
      oat: "Günde 3 yemek kaşığı yulaf kepeği.",
      water: "Günde 1.5 litre su (çay ve kahve dahil)",
      allowedFoods: "Herşey serbest. Sağlıklı besinler önerilir."
    }


  ]



  let collection = req.app.get('DB').collection('recommendation');
  let p = collection.insertMany(data);
  p.then(result => {
    res.status(200).send("Rec başarıyla oluşturuldu.")
  }).catch(error => {
    res.status(500).json(error);
  });


}
