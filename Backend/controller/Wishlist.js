const express = require("express")
const router = express.Router()
const dbuser = require('../modal/userModal')
const dbproduct = require('../modal/productModal')
const jwt = require("jsonwebtoken")
const config = require("../config/config")

//get wishlist
router.get('/',(req,res)=>{

    const token = req.headers["x-access-token"]

    if(!token) return res.send({auth:false, token:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{
            if(err) return res.send({auth:false, message:"Invalid token"})
            if(data){
                dbuser.findById(data.id,(err,data)=>{
                    if(err) throw err
                    res.send(data.wishlist_products)
                })
            }
        })
    }
})


//add product to wishlist
router.put('/add_product',(req,res)=>{

    const token = req.headers["x-access-token"]
    const product_id = req.body.product_id

    if(!token) return res.send({auth:false, token:"Token not provided"})
    if(token){
        jwt.verify(token, config.secret, (err,data)=>{
            if(err) return res.send({auth:false, message:"Invalid token"})

            if(data){

                dbproduct.findById(product_id,(err,pdata)=>{

                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})

                    dbuser.updateOne({_id:data.id},{$push:{wishlist_products:pdata}},(err,data)=>{
                        if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                        res.send({auth:true,message:"Product added successfully"})
                    }) 
                })
            }
        })
    }
})


//remove product from wishlist
router.put('/remove_product',(req,res)=>{

    const token = req.headers["x-access-token"]
    const product_id = req.body.product_id

    if(!token) return res.send({auth:false, token:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})

            if(data){

               dbuser.findById(data.id,(err,userData)=>{

                   if(err) return res.send({auth:false, message:"Action failed"})
                   
                   if(userData){
                        const wishlist = userData.wishlist_products.filter(items=>items.price !==  3990)
                        
                        console.log(wishlist.length)

                        userData.save(err,data=>{
                            if(err) throw err
                            console.log(data)
                        })
                    }

               })
            }
        })
    }
})


module.exports=router;