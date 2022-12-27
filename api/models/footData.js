const mongoose=require('mongoose')
const activtySchems=mongoose.Schema({
    userId:mongoose.Types.ObjectId,
    date:String,
    foodName:String,
    mealType:String,
    foodGroup:String,
    serving:String,
    calaroies:String,
})
module.exports=mongoose.model('footData',activtySchems);