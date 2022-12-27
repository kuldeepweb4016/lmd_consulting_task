const mongoose=require('mongoose');
const activitySchema=mongoose.Schema({
    ACTIVITY:String,
    SPECIFICMOTION:String,
    METs:String
})
module.exports=mongoose.model('activityRecord',activitySchema)