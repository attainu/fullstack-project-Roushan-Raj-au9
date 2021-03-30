const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    category_id:{
        type:String,
        required:true
    },
    category_name:{
        type:String
    },
    category_thumb:{
        type:String
    }

})

mongoose.model('product_category', productSchema)
module.exports = mongoose.model('product_category') 