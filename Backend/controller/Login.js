const express = require("express")
const router = express.Router()
const dbuser = require('../modal/userModal')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/config")


//login
router.post('/',(req,res)=>{

    dbuser.findOne({email:req.body.email},(err,data)=>{
        if(err) return res.send({auth:false, message: "Something went wrong"})
        if(!data) return res.send({auth:false, message: "Email not registered. Please register first."})
        if(data){
            if(data.role !== "company"){

                const matchpassword = bcrypt.compareSync(req.body.password, data.password)

                if(!matchpassword) return res.send({auth:false, message:"Invalid password"})

                const token = jwt.sign({id:data._id}, config.secret, {expiresIn:86400})
            
                res.send({auth:true, token:token, profile:data})
            }
            else{
                return res.send({auth:false, message: "Seems a company account! Try company SignIn"})
            }
        }

    })
})

router.post('/company',(req,res)=>{

    dbuser.findOne({email:req.body.email},(err,data)=>{
        if(err) return res.send({auth:false, message: "Something went wrong"})

        if(!data) return res.send({auth:false, message: "Email not registered. Please contact company"})

        if(data){

            if(data.role === "company"){
                const matchpassword = bcrypt.compareSync(req.body.password, data.password)

                if(!matchpassword) return res.send({auth:false, message:"Invalid password"})
    
                const token = jwt.sign({id:data._id}, config.secret, {expiresIn:86400})
                
                res.send({auth:true, token:token, profile:data})
            }
            else{
                return res.send({auth:false, message: "You are not a valid user"})
            }
        }
    })
})

module.exports=router;