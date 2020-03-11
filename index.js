const express=require('express');
const app=express();
const forgpass=require('./ForgetPassword/Forgpass-route');
const connection=require('./DBconnection/connection');
const bodyParser=require('body-parser');
app.listen(3000);
//connect to database
connection(app);
//call forpassroute
app.use('/login/forgetpassword',forgpass);

