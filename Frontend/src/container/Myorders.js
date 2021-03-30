import React, { Component } from 'react'
import {Link} from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux'
import { getProfile } from '../action/Action';


class Myorders extends Component {

    componentDidMount(){
        this.props.dispatch(getProfile())
    }


    renderProducts=(data)=>{
        if(data){
            return data.map((items) => {
                return (
                  <tr key={items._id}>
                    <td>{items.category_id}</td>
                    <td>{items._id}</td>
                    <td><Avatar alt="Remy Sharp" src={items.thumb}/></td>
                    <td>{items.name}</td>
                    <td>{items.brand}</td>
                    <td>{items.price}</td>
                  </tr>
                );
              });
        }
    }

    
    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px",overflow:"auto"}}>
                <Link to="/myaccount" style={{textDecoration:"none",padding:"20px"}}>
                        <h5 style={{color:"black"}}>&#60; Back to my account</h5>
                    </Link>
                <h5>Order History</h5>

                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>

                {
                    this.props.profile && this.props.profile.orders.length !== 0?
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Product ID</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                    </tr>
                    </thead>
                    <tbody>{this.renderProducts(this.props.profile.orders)}</tbody>
                </table>
                :
                <center style={{marginTop:"10%",marginBottom:"10%"}}>
                    <h1>Oops ! Yet not order any product</h1>
                    <Link to="/">
                        <button className="btn btn-light">Shop now</button>
                    </Link>
                </center>
                }
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        profile : state.Profile.profileData
    }
}

export default connect(mapStateToProps)(Myorders);