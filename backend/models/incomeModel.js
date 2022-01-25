const mongoose=require("mongoose")

const incomeSchema = mongoose.Schema({
    name:String,
    income:Number,
    date:Date
})

const incomeModel=mongoose.model("income",incomeSchema)
module.exports=incomeModel