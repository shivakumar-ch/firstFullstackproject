const { response } = require('express');
var express = require('express');
const { findByIdAndDelete, update } = require('../models/incomeModel');
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
    name,income:parseInt(income,10)
  })
  // console.log(typeof(income),'income')
  try{
    add.save((err,response)=>{
    if(err)
    console.log(err,"errrrrrr")
    else
    res.send({status:200,createdUser:response})
  })
  }catch(err){
    console.log(err,"reeeeeeeeeeeee")
  }
  
  // res.send({
  //   "status":200,
  //   "status_text":"success",
  //   body:{name,income}
  // })
})

router.put("/update",(req,res)=>{
  const {_id,name,income} = req.body
  const data={
    name,income:parseInt(income,10)
  }
  // console.log(req.update,"-------updte")
  // console.log(_id,name,income,'--------------')
  incomeObj.findByIdAndUpdate(_id,data,
    (err,response)=>{
    if(err)
    console.log(err)
    else
    res.send({status:200,createdUser:response})
    }
  )
})

router.put("/updateall",async (req,res)=>{
  const {usersLi} = req.body
  // console.log(usersLi)
  incomeObj.deleteMany({},(err,response)=>{
    if(err) console.log(err)
  })
  const resp=await incomeObj.insertMany([...usersLi])
 
  res.send({status_text:'ok',response:resp})
})

router.delete("/del",(req,res)=>{
  const {id} = req.query
  // console.log(id,"-------")
  incomeObj.findByIdAndDelete(id,(err,response)=>{
    if(err){
      console.log(err)
    }else{
      res.send({"status":200,"db_response":response})
    }
  })
  
})
 

module.exports = router;


