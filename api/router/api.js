const router = require('express').Router()
const userRecord = require('../models/signup')
const foodRecord = require('../models/recordfood')
const userActivityRecord  = require('../models/activityRecord')
const userFoodlog = require('../models/footData')
 const userActivity = require('../models/activity')

router.post('/usersignup',async(req,res)=>{
    const{signupname,signupweight,signupheight,signupsex,signupage} = req.body;
    let dob = new Date(signupage);    
    let dobdobYear = dob.getYear();       
    let now = new Date();   
    let currentYear = now.getYear();  
    yearAge = currentYear - dobdobYear;  
   let BMR=null;
   try{
    const checkrecord=await userRecord.findOne({name:signupname})
        if(checkrecord==null){
     if(signupsex=='Male'){
              BMR=66.4730+(13.7516*signupweight)+(5.0033*signupheight)-(6.7550*yearAge)
     }else{
        BMR=655.0955+(9.5634*signupweight)+(1.8496*signupheight)-(4.6756*yearAge)
     }
    const recordInsert=new userRecord({name:signupname,weight:signupweight,height:signupheight,sex:signupsex,dob:signupage,bmr:BMR});
    recordInsert.save();
    res.status(200).json(recordInsert);
 }   
 else{
     res.status(200).json({message:'Name is already existing'})
 }}
     catch(error){
         res.status(400).json({error:error.message})
     }})



router.get('/userbmr',async(req,res)=>{
    try{
        const userdata=await userRecord.find();
        res.status(200).json(userdata);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})



router.post('/recorddelete/:id',async(req,res)=>{
    const id=req.params.id;
    
    try{
    await userRecord.findByIdAndDelete(id);
    await userFoodlog.deleteMany({userId:id})
    await userActivity.deleteMany({userId:id})
    res.status(200).json({message:' delete successfully '});}
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/showrecord',async(req,res)=>{
    try{
        const record=await userRecord.find();
        res.status(200).json(record);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/showfooddata',async(req,res)=>{
    try{
   const data=await foodRecord.find();
   res.status(200).json(data)}
   catch(error){
    res.status(400).json({error:error.message})
   }
})

router.get('/foodgroup/:id',async(req,res)=>{
    try{
    const id=req.params.id;
    const foodGroup=await foodRecord.findById(id)
    res.status(200).json({
        foodgroup:foodGroup.FoodGroup,
        serveingdesc:foodGroup.ServingDescription1g,
        calaroies:foodGroup.Calories,
        foodname:foodGroup.name})}
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/activitydata',async(req,res)=>{
    try{
    const record=await userActivityRecord.find()
    res.status(200).json(record)}
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/metdata/:id',async(req,res)=>{
    const id=req.params.id;
    try{
    const record=await userActivityRecord.findById(id)
    res.status(200).json(record)}
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.get('/viewuserdata/:id',async(req,res)=>{
    let userId=req.params.id;
    try{
        const uname=await userRecord.findById(userId)
 let food=await userFoodlog.find({userId:userId})
 let calout=await userActivity.find({userId:userId})

    res.status(200).json({user:uname,food:food,calout:calout})}
    catch(error){
        res.status(400).json({error:error.message})
    }
})

router.post('/foodadd',(req,res)=>{
    const {date,foodNamee,foodGroup,meal,serving,ids,calaroies}=req.body
    let dateInsert = new Date()
    try{
    const useractivit=new userFoodlog({
        userId:ids,date:date,
        foodName:foodNamee,
        mealType:meal,
        foodGroup:foodGroup,
        serving:serving,
        calaroies:calaroies,
        dateinsert:dateInsert});
    useractivit.save();
    res.status(200).json({message:'Successfully  inserted add food data '})
}catch(error){
    res.status(400).json({error:error.message})
}
})

router.post('/showactivityadd',(req,res)=>{
    const {date,acti,activityDesc,activityMetvalue,activityDuration,ids}=req.body;
    let dataInsert = new Date()
    const alog=new userActivity({date:date,name:acti,desc:activityDesc,met:activityMetvalue,duration:activityDuration,userId:ids,dateinsert:dataInsert})
    alog.save();
    res.status(200).json({mess:'Successfully  inserted add activity data'})
})

module.exports = router;