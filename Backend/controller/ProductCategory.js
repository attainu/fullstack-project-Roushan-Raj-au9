const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const dbcategory = require("../modal/categoryModal")

router.use(bodyParser.json())

//get category
router.get('/',(req,res)=>{
    dbcategory.find({},(err,data)=>{
        if(err) return res.send({auth:false, message:"Something went wrong, try again."})
        res.send(data)
    })
})

//create category (for company)
router.post('/create',(req,res)=>{
    let data = {
        category_id:req.body.category_id,
        category_name:req.body.category_name,
        category_thumb:req.body.category_thumb
    }

    dbcategory.create(data,(err,data)=>{
        if(err) return res.send({auth:false, message:"Something went wrong, try again."})
        res.send({auth:true, message:"Category added"})
    })
})


module.exports = router;