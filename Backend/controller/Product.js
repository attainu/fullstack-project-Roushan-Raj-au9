const express = require("express")
const router = express.Router()
const dbproduct = require("../modal/productModal");
const dbuser = require("../modal/userModal")
const jwt = require("jsonwebtoken")
const config = require("../config/config")


router.get('/',(req,res)=>{
    res.send({health:"ok",message:"this is product route"})
})


//get all the products (for search products)
router.get('/all_product',(req,res)=>{
    dbproduct.find({},(err,data)=>{
        if(err) return res.send({auth:false, message:"Something went wrong, try again."})
        res.send(data)
    })
})


//get verified products(for company)
router.get('/verified',(req,res)=>{

    const token = req.headers["x-access-token"]

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})
            
            if(data){
                dbuser.findById(data.id,(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})

                    if(data.role === "company"){
                        dbproduct.find({verified:true},(err,data)=>{
                            if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                            res.send(data)
                        })
                    }
                    else{
                        res.send({auth:false, message:"You are not an authorise person"})
                    }
                })
            }
        })
    }
})


//get not verified products(for company)
router.get('/not_verified',(req,res)=>{

    const token = req.headers["x-access-token"]

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})
            
            if(data){

                dbuser.findById(data.id,(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})

                    if(data.role === "company"){
                        dbproduct.find({verified:false},(err,data)=>{
                            if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                            res.send(data)
                        })
                    }
                    else{
                        res.send({auth:false, message:"You are not an authorise person"})
                    }
                })
            }
        })
    }
})


//verifying the product(for company)
router.put('/verification/:id',(req,res)=>{

    const token = req.headers['x-access-token']
    const productId = req.params.id
    
    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid Token"})

            if(data){
                dbuser.findById(data.id,(err,data)=>{
                    if(err) throw err
                    if(data.role==="company"){
                        dbproduct.updateOne({_id:productId},{verified:true},(err,data)=>{
                            if(err) return res.status(500).send({auth:false,message:"Action failed ! Please try again."})

                            res.send({auth:true, message:"Status has been changed to verified"})
                        })
                    }
                    else{
                        res.send({auth:false, message:"You are not an authorise person"})
                    }
                })
               
            }
        })
    }
})


//get products accord to seller_id (for seller and company)
router.post("/selected_seller",(req,res)=>{

    const token = req.headers["x-access-token"]
    const seller_id = req.body.seller_id

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})
            
            if(data){
                dbproduct.find({seller_id:seller_id},(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                    res.send(data)
                })
            }
        })
    }
})


//add product (for seller and company)
router.post('/add_products',(req,res)=>{

    console.log(req.body)

    const token = req.headers["x-access-token"]

    const productData = {
        name:req.body.name,
        brand:req.body.brand,
        description:req.body.description,
        price:req.body.price,
        thumb:req.body.thumb,
        quantity_available:req.body.quantity_available,
        quantity_ordered:req.body.quantity_ordered?req.body.quantity_ordered:0,
        shipping:req.body.shipping?req.body.shipping:true,
        createdAt: new Date(),
        category_id:req.body.category_id,
        seller_id:req.body.seller_id,
        seller_name:req.body.seller_name,
        verified:req.body.verified?req.body.verified:false
    }

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})
            
            if(data){
                dbproduct.create(productData,(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                    res.send({auth:true, message:"Product added successfully"})
                })
            }
        })
    }
})


//edit product (for seller and company)
router.put('/update_product/:id',(req,res)=>{

    const token = req.headers['x-access-token']
    const productId = req.params.id

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid Token"})

            if(data){
                dbproduct.findById(productId,(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})

                    if(!data){
                        return res.status(500).send({auth:false,message:"Product not found."})
                    }
                    if(data){

                        if(req.body){
                            data.name=req.body.name,
                            data.brand=req.body.brand,
                            data.description=req.body.description,
                            data.price=req.body.price,
                            data.thumb=req.body.thumb,
                            data.quantity_available=req.body.quantity_available,
                            data.shipping=req.body.shipping,
                            data.category_id=req.body.category_id
                        }
                        data.save((err,updateddata)=>{
                            if(err){
                                return res.status(500).send({auth:false,message:"Data not saved ! Please try again."})
                            }
                            else{
                                res.send({auth:true, message:"Product updated successfully"})
                            }
                        })
                    }
                })
            }
        })
    }
})

// delete a product (for seller)
router.delete("/delete",(req,res)=>{

    const token = req.headers["x-access-token"]
    const _id = req.body.productId

    if(!token) return res.send({auth:false, message:"Token not provided"})

    if(token){
        jwt.verify(token, config.secret, (err,data)=>{

            if(err) return res.send({auth:false, message:"Invalid token"})
            
            if(data){
                dbproduct.deleteOne({_id:_id},(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                    res.send({auth:"true", message:"Product has been deleted"})
                })
            }
        })
    }
})


//get products accord to category
router.post("/selected_category",(req,res)=>{
    const category_id = req.body.category_id
    dbproduct.find({category_id:category_id},(err,data)=>{
        if(err) return res.send({auth:false, message:"Something went wrong, try again."})
        res.send(data)
    })
})


//get individual product details
router.post("/details",(req,res)=>{
    const _id = req.body._id
    dbproduct.findById(_id,(err,data)=>{
        if(err) return res.send({auth:false, message:"Something went wrong, try again."})
        res.send(data)
    })
})


//set review of product
router.put('/add_review/:id',(req,res)=>{

    const token = req.headers["x-access-token"]
    const product_id = req.params.id

    const reviewData = {
        review : req.body.review,
        postBy : req.body.postBy,
        postOn : new Date()
    }

    if(!token) return res.send({auth:false, token:"Token not provided"})
    if(token){
        jwt.verify(token, config.secret, (err,data)=>{
            if(err) return res.send({auth:false, message:"Invalid token"})
            if(data){
                
                dbproduct.updateOne({_id:product_id},{$push:{reviews:reviewData}},(err,data)=>{
                    if(err) return res.send({auth:false, message:"Something went wrong, try again."})
                    res.send({auth:true,message:"Thanks for your feedback."})
                }) 
              
            }
        })
    }
})


module.exports=router