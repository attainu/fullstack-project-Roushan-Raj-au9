import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import CompanyDashboard from './company/CompanyDashboard';
import SellerDashboard from './seller/SellerDashboard';

class UserAccount extends Component {


    render() {

        const profile = JSON.parse(localStorage.getItem("profile"));

        return (
            <div className="container" style={{marginTop:"50px",marginBottom:"50px"}}>

                <div>

                    <h1>My Account</h1>

                    <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh"}}></div>

                    <div className="row" style={{marginTop:"50px",marginBottom:"50px"}}>


                        <div className="col-md-4">
                            <Link to='/myaccount/profile' style={{textDecoration:"none"}}>
                                <h5 style={{color:"black"}}>My Profile &#62;</h5>
                                <p style={{color:"grey"}}>Edit personal info, change password</p>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <Link to='/myaccount/orders' style={{textDecoration:"none"}}>
                                <h5 style={{color:"black"}}>My Orders &#62;</h5>
                                <p style={{color:"grey"}}>view, modify and track orders</p>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <h5>My Address &#62;</h5>
                            <p style={{color:"grey"}}>Edit, add or remove addresses</p>
                        </div>

                    </div>

                </div>

                {/* seller section */}
                {localStorage.getItem('profile') && profile.role==="seller"?
                <SellerDashboard/>:null}

                {/* company section */}
                {localStorage.getItem('profile') && profile.role==="company"?
                <CompanyDashboard/> 
                :null}





                <div>
                    <h5>Buy something to get personalised recommendations.</h5>
                    <Link to="/">
                        <button className="btn btn-light">Continue shopping</button>
                    </Link>
                </div>

            </div>
        )
    }
}

export default UserAccount;