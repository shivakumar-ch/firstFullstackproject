const mongoose=require("mongoose")

const userSchema = mongoose.Schema({
    name:String,
    rollNo:Number
})

const userModel=mongoose.model("details",userSchema)
module.exports=userModel