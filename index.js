const mongoose=require('mongoose');
const express=require('express');
const signUp=require('./routes/signUp');
const bodyparser=require('body-parser');
const app=express();
app.use(bodyparser.json());

app.use(signUp);
//ES6 promises
mongoose.Promise=global.Promise;

//connect to db before test run

mongoose.connect('mongodb://localhost/spotify', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
app.use(function(error,req,res,next){
    res.send({error:error.message})
    
    });
app.listen(process.env.port||3000,function(){
    console.log('listening for a request');
});
module.exports=app;