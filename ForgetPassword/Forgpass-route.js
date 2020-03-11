const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');
var users=require('../users/user');
var sendmail=require('./sendmail');

var jsonparser = bodyParser.json();

router.get('/',function(req,res)
{
    res.render('ForgetPass');
});
router.post('/',jsonparser,async function(req,res)
{
    let email=req.body.email;
    console.log(email);
    let user=await users.checkmail(email);
    
    if(!user)
    {
        res.send('THERE IS NO SUCH USER');
    }
    else 
    {

       let newPass= await users.updateforgottenpassword(email);
       if(!newPass){return res.send("user not found");}
       else
       {
       res.send("YOUR PASSWORD IS UPDATED");
        sendmail(email,newPass);
       }
    }

});
module.exports=router;