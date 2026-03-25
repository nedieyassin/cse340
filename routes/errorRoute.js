// Needed resources
const express = require("express");
const router = new express.Router(); 
const utilities = require("../utilities");
const errorController = require("../controllers/errorController");


// Route to cause 500 type error
router.get("/", utilities.handleErrors(errorController.causeError));
module.exports = router;