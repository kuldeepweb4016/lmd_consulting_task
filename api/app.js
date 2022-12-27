const express = require('express')
const app = express()
app.use(express.json());
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/calorie')
const apiRouter = require('./router/api')

app.use('/api',apiRouter)
app.listen(5000,()=>{
    console.log("server is conted this port 5000...")
})