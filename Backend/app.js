const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const db = require('./config/db')
const port = process.env.PORT || 2400
app.use(cors())

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send({
        message: "Welcome to the e-commerce Application Programming Interface",
        health: "Ok"
    })
})


const Users = require("./controller/Users")
app.use("/users", Users)


const ProductCategory = require("./controller/ProductCategory")
app.use("/product_category", ProductCategory)


const Product = require("./controller/Product")
app.use("/products", Product)


const Login = require("./controller/Login")
app.use("/login", Login)


const Register = require("./controller/Register")
app.use("/register", Register)


const Profile = require("./controller/UserProfile")
app.use("/profile", Profile)


const WishlistProducts = require("./controller/Wishlist")
app.use("/wishlist", WishlistProducts)


const stripe = require("./controller/Payment")
app.use("/stripe_payment", stripe)


app.listen(port, (err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})