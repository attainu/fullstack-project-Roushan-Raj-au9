import React from 'react'

const Footer = () => {
    return (
        <div style={{backgroundColor:"black",color:"white"}}>
            <div className="container">

            <div style={{padding:"20px"}}>
                <h2 style={{color:"yellow"}}>Swipe Shop Ship</h2>
            </div>
            <div className="row" style={{padding:"20px"}}>

                <div className="col-md-3">
                    <h6 style={{color:"yellow"}}>
                        CUSTOMER SERVICES
                    </h6>
                    <p>Contact Us</p>
                    <p>Track Order</p>
                </div>
                <div className="col-md-3">
                    <h6 style={{color:"yellow"}}>
                        COMPANY
                    </h6>
                    <p>About Us</p>
                    <p>Terms & Conditions</p>
                    <p>Privacy Policies</p>
                </div>
                <div className="col-md-3">
                    <h6 style={{color:"yellow"}}>
                        CONNECT WITH US
                    </h6>
                    <p>Facebook</p>
                    <p>Instagram</p>
                </div>
                <div className="col-md-3">
                    <p>15 Days retun policy</p>
                    <p>Cash on delivery</p>
                </div>

            </div>
            </div>
        </div>
    )
}

export default Footer