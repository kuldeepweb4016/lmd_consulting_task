const mongoose=require('mongoose')
const foodRecord=mongoose.Schema({
    ID:String,
    name:String,
    FoodGroup:String,
    Calories:String,
    "Fat(g)":String,
    "Protein(g)":String,
    "Carbohydrate(g)":String,
    ServingDescription1g:String
})
module.exports=mongoose.model("recordfood",foodRecord);