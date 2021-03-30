const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const dbuser = require('../modal/userModal')
const validator = require("email-validator")


router.post('/',(req,res)=>{

    const hashPassword = bcrypt.hashSync(req.body.password, 8)
    
    const userData = {
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,
        role: req.body.role?req.body.role:"buyer"
    }

    let validEmail = validator.validate(userData.email)
    console.log(validEmail)


    if(!validEmail){
        return res.send({auth:false, message:"Email invalid, Try again"})
    }

    else{
        dbuser.findOne({email:userData.email},(err,data)=>{

            if(err) return res.send({auth:false, message: "Error while connecting to database"})
    
            if(data) return res.send({auth:false, message:"Email already registered"})
    
            if(!data) {
                dbuser.create(userData,(err,data)=>{
                    if(err) return res.send({auth:false, message: "Error while registering the user"})
    
                    return res.send({auth:true, message:"Successfully Registered"})
                })
            }
        })
    }

})


module.exports=router;