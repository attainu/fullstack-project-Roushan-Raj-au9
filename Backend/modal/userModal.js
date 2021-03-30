const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    role:{
        type:String,
        required:true
    },
    orders:[],
    wishlist_products:[]
})

mongoose.model('users', userSchema); //here user is the name of database collection

module.exports=mongoose.model('users')