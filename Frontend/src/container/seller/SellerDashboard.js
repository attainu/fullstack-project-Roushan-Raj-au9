import React from 'react'
import {Link} from 'react-router-dom'

const SellerDashboard=()=> {
    return (
        <div>
            <h1>Seller Dashboard</h1>

            <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh"}}></div>

            <div className="row" style={{marginTop:"50px",marginBottom:"50px"}}>

                <div className="col-md-4">
                    <Link to='/myaccount/addproduct' style={{textDecoration:"none"}}>
                        <h5 style={{color:"black"}}>Add Product &#62;</h5>
                        <p style={{color:"grey"}}>Edit personal info, change password</p>
                    </Link>
                </div>

                <div className="col-md-4">
                    <Link to='/myaccount/sellerproducts' style={{textDecoration:"none"}}>
                        <h5 style={{color:"black"}}>Update Product &#62;</h5>
                        <p style={{color:"grey"}}>Edit, or remove product</p>
                    </Link>
                </div>

            </div>

        </div>
    )
}
export default SellerDashboard