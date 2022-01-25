var express = require('express');
const { findByIdAndDelete } = require('../models/incomeModel');
var router = express.Router();
const incomeObj = require("../models/incomeModel")

/* GET home page. */
router.get('/', function(req, res, next) {
   incomeObj.find(function(err,response){
    if(err) 
    console.log(err)
    else
    res.send([...response])
  })
});

router.post("/add",(req,res)=>{
  const {name,income} = req.body
  console.log(name,income,'--------------')
  const add=new incomeObj({
    name,income
  })
  console.log(typeof(income),'income')
  add.save()
  res.send({
    "status":200,
    "status_text":"success",
    body:{name,income}
  })
})

router.delete("/del",(req,res)=>{
  const {id} = req.query
  console.log(id,"-------")
  incomeObj.findByIdAndDelete(id,(err,response)=>{
    if(err){
      console.log(err)
    }else{
      res.send({"status":200,"db_response":response})
    }
  })
  
})
 

module.exports = router;

