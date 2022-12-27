const mongoose=require('mongoose');
const activityDataSchema=mongoose.Schema({
    date:String,
    name:String,
    desc:String,
    met:String,
    duration:String,
    userId:mongoose.Types.ObjectId,
    dateinsert:Date
})
module.exports=mongoose.model('activity',activityDataSchema)