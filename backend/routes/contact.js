var express = require('express');
var router = express.Router();
const contactsObj = require("../models/contactsModel")

/* GET home page. */
router.get('/', function(req, res, next) {
   contactsObj.find(function(err,response){
    if(err)
    console.log(err)
    else
    res.send([...response])
  })
});
 

module.exports = router;

