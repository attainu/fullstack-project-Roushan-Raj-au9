const express = require("express")
const router = express.Router()
const stripe = require("stripe")("sk_test_51IacUHSEYmkG8lIHE1ZYQQgFpyIfDBAFZWsugjOsrEl6ovKacpNoaO4SdTDT3VuzCrtt5umN9X3pCMQj0D8TBhNn005Q5PA2mS")
const uuid = require("uuid/v4")


router.post("/",(req,res)=>{

    const { products, totalvalue, token } = req.body

        console.log("PRODUCTS >>", products)
        console.log("TOKEN >>", token)

        // let amount = 0;
        // products.map( (item) => {
        //     amount = amount + item.price
        // })
        

        const idempotencyKey = uuid()

        return stripe.customers.create({
            email: token.email,
            source: token.id
        })
        .then( (customer) => {
            stripe.charges.create({
                amount: totalvalue * 100, 
                currency: 'usd', 
                customer: customer.id, 
                receipt_email: token.email, 
                description: "Swipe Shop Ship", 

                shipping: { 
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    } 
                } 
                }, 
                { idempotencyKey }
                )
                .then( (result) => res.status(200).json(result))
                .catch( (err) => console.log(err))       
        })

})

module.exports = router