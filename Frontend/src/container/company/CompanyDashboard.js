import React from 'react'
import {Link} from 'react-router-dom'

const CompanyDashboard=()=> {
    return (
        <div>
            <h1>Company Dashboard</h1>

            <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh"}}></div>

            <div className="row" style={{marginTop:"50px",marginBottom:"50px"}}>

                <div className="col-md-3">
                    <Link to='/myaccount/buyers' style={{textDecoration:"none"}}>
                        <h5 style={{color:"black"}}>All Buyers &#62;</h5>
                        <p style={{color:"grey"}}>List of all registered buyers</p>
                    </Link>
                </div>

                <div className="col-md-3">
                    <Link to='/myaccount/sellers' style={{textDecoration:"none"}}>
                        <h5 style={{color:"black"}}>All Sellers &#62;</h5>
                        <p style={{color:"grey"}}>List of all registered sellers</p>
                    </Link>
                </div>

                <div className="col-md-3">
                    <Link to='/myaccount/verifiedproducts' style={{textDecoration:"none"}}>
                        <h5 style={{color:"black"}}>Verified Products &#62;</h5>
                        <p style={{color:"grey"}}>List of verified products</p>
                    </Link>
                </div>

                <div className="col-md-3">
                    <Link to='/myaccount/notverifiedproducts' style={{textDecoration:"none"}}>
                        <h5 style={{color:"black"}}>Not Verified Products &#62;</h5>
                        <p style={{color:"grey"}}>List of not verified products</p>
                    </Link>
                </div>

            </div>

        </div>
    )
}
export default CompanyDashboard