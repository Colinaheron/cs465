const express = require('express'); 
const router = express.Router(); 

const tripsController = require('../controllers/trips');
//define route for trips endpoint
router 
    .route('/trips') //take a request for trips
    .get(tripsController.tripsList); //pass it to the controller
// GET method routes tripsFindByCode -req parameter
router
    .route('/trips/:tripCode') //take a request for trips
    .get(tripsController.tripsFindByCode); //pass it to the controller

module.exports = router;