const express = require("express")
const router = express.Router()
const dbuser = require('../modal/userModal')
const jwt = require("jsonwebtoken")
const config = require("../config/config")

router.get('/',(req,res)=>{
    res.send({health:"ok", message:"this is user route"})
})


//get all buyers(for company)
router.get('/buyer',(req,res)=>{

    const token = req.headers["x-access-token"]

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})
            
            if(data){
                dbuser.findById(data.id,(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                    if(data.role==="company"){
                        dbuser.find({role:"buyer"},(err,data)=>{
                            if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                            res.send(data)
                        })
                    }
                    else{
                        return res.send({auth:false, message:"You are not an authorise person"})
                    }
                })
            }
        })
    }
})


//get all seller(for company)
router.get('/seller',(req,res)=>{

    const token = req.headers["x-access-token"]

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})
            
            if(data){

                dbuser.findById(data.id,(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                    if(data.role==="company"){
                        dbuser.find({role:"seller"},(err,data)=>{
                            if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                            res.send(data)
                        })
                    }
                    else{
                        return res.send({auth:false, message:"You are not an authorise person"})
                    }
                })
            }
        })
    }
})


module.exports=router;