const mongoose = require("mongoose")

// const url = "mongodb://localhost:27017/e-commerce"

const url = "mongodb+srv://kp_13:kuj166@cluster0.nckbm.mongodb.net/e-commerce?retryWrites=true&w=majority"

mongoose.connect(url, { useUnifiedTopology: true , useNewUrlParser: true })