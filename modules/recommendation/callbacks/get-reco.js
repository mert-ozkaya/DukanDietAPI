module.exports = function(req,res) {

  if("phase" in req.query){
    
    let phase = req.query.phase
    let filter = {'phase': parseInt(phase) }

    let collection = req.app.get('DB').collection('recommendation');
    let p = collection.findOne(filter)

    p.then((result) => {
      if(result) res.send(result)
      else res.sendStatus(400)

    }).catch((err) => {
      res.sendStatus(500).send('db-error');
    })

  }else {
    return res.status(400).send("undefined_phase")
  }


}
