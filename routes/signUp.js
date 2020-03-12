const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const spotifySchema = require('../models/DB');
const bcrypt = require('bcrypt');
const joi = require('joi');
router.post('/signup',(req,res)=>{

    const shcema = joi.object().keys({

        email: joi.string().trim().email().required() ,
        password: joi.string().required(),
        gender: joi.string().required() ,
        country: joi.string().required() ,
        birthDate: joi.string().required() ,
        displayName:joi.string().required()

    });

    joi.validate(req.body,shcema,(err,result)=>{

        if(err){

            res.status(500).json({
                error:err
            })

        } else {

            spotifySchema.user.findOne({email:req.body.email}).exec().then(user=>{
                if(user){
                    
                    res.status(409).json({
                        message:'Mail exists'
                    });

                }
                else{

                    bcrypt.hash(req.body.password,10,(err,hash)=>{
                        if(err) {

                            return res.status(500).json({error:err});

                        } else {

                            const user=new spotifySchema.user({
                                _id: mongoose.Types.ObjectId(),
                                email: req.body.email ,
                                password: hash,
                                displayName: req.body.username ,
                                gender: req.body.gender ,
                                country :req.body.country ,
                                birthDate:req.body.birthday
                            });
                            
                            user
                                .save()
                                .then(result =>{
                
                                    res.status(201).json({
                                        message:'User created'
                                    });
                                    
                                })
                                .catch(err=>{
                                    res.status(500).json({
                                        error:err
                                    });
                                });
                            res.redirect('/login');

                        }

                    })

                }


            });
           


            
        }




    });


});

router.get('/users/:id',(req,res,next)=>{
    spotifySchema.user.find({_id:req.params.id}).exec().then(user=>{
        if(user){

            res.status(200);
            res.send(user);
            
        }
        else {
            res.status(404).json({
                message:'user not found'
            });
            
        }        
}).catch(next);
})

router.get('/:id',(req,res,next)=>{
    spotifySchema.user.find({_id:req.params.id}).exec().then(user=>{
        if(user){

            res.status(200);
            res.send(user);
            
        }
        else {
            res.status(403).json({
                message:'user not found'
            });
            
        }        
}).catch(next);
})

router.get('/login',(req,res,next)=>{
    res.send('logged');
})


module.exports = router;