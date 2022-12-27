const mongoose = require('mongoose')
const userSignup = mongoose.Schema({
    name:String,
    weight:String,
    height:String,
    sex:String,
    age:String,
    dob:Date,
    bmr:String
})
module.exports=mongoose.model('signup',userSignup)