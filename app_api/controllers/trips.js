const mongoose = require('mongoose'); 
const model = mongoose.model('trips'); 

//GET: /trips- lists all the trips
const tripsList = async (req, res) => {
  const q = await model 
  .find({}) 
  .exec();

  if(!q)
  {
    return res
        .status(404)
        .json(err);
  }  else {
    return res
        .status(200)
        .json(q);
  }
};

//GET: /trips- lists single trip
const tripsFindByCode = async (req, res) => {
    const q = await model 
    .find({'code' : req.params.tripCode }) //return the single record
    .exec();
  
    if(!q)
    {
      return res
          .status(404)
          .json(err);
    }  else {
      return res
          .status(200)
          .json(q);
    }
  };
  

module.exports = {
  tripsList,
  tripsFindByCode
};