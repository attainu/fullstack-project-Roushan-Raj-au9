const express = require("express")
const router = express.Router()
const dbuser = require('../modal/userModal')
const jwt = require("jsonwebtoken")
const config = require("../config/config")
const { compareSync, hashSync } = require("bcryptjs")

//get profile
router.get('/',(req,res)=>{

    const token = req.headers["x-access-token"]

    if(!token) return res.send({auth:false, token:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})
            
            if(data){
                dbuser.findById(data.id,(err,data)=>{
                    if(err) throw err
                    res.send(data)
                })
            }
        })
    }
})

//update name 
router.post('/updatename',(req,res)=>{

    const token = req.headers['x-access-token']
    const name = req.body.newname
    
    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid Token"})

            if(data){
                dbuser.updateOne({_id:data.id},{name:name},(err,data)=>{
                    if(err) return res.status(500).send({auth:false,message:"Action failed ! Please try again."})
                    res.send({auth:true, message:"Your name has been updated"})
                })
            }
        })
    }
})

//update password
router.post('/updatepassword',(req,res)=>{
    const token = req.headers['x-access-token']
    const newpassword = hashSync(req.body.newpassword, 8)
    const oldpassword = req.body.oldpassword

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid Token"})

            if(data){
                dbuser.findById(data.id,(err,data)=>{

                    if(err) return res.status(500).send({auth:false,message:"Action failed ! Please try again."})

                    if(data){
                        
                        const matchpassword = compareSync(oldpassword, data.password)
                        if(!matchpassword) return res.status(500).send({auth:false,message:"Incorrect old password"})

                        if(matchpassword){

                            dbuser.updateOne({_id:data._id},{password:newpassword},(err,data)=>{
                                if(err) return res.status(500).send({auth:false,message:"something went wrong, try again."})

                                res.send({auth:true, message:"Password updated successfully"})
                            })
                        }
                    }
                })
            }
        })
    }
})

module.exports=router;