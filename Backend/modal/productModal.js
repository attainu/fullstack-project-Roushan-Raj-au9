const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    thumb:{
        type:String,
        required:true
    },
    quantity_available: {
        type:Number,
        
    },
    quantity_ordered: {
        type:Number,
       
    },
    shipping: {
        type:Boolean,
        required:true
    },
    createdAt: {
        type:String
    },
    category_id:{
        type:String
    },
    seller_id:{
        type:String
    },
    seller_name:{
        type:String
    },
    verified:{
        type:Boolean
    },
    reviews:[
        {
            review : {type:String, required:true},
            postBy : {type:String, required:true},
            postOn : {type:String}
        }
    ],
})

mongoose.model("products", productSchema);
module.exports = mongoose.model("products")