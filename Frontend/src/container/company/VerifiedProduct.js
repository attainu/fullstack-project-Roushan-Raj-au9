import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import Avatar from '@material-ui/core/Avatar';
import { getvProducts } from '../../action/CompanyAction';

class VerifiedProduct extends Component {


    constructor(){
        super()

        this.state = {
            success:"",
            error:""
        }
    }


    componentDidMount(){
        this.props.dispatch(getvProducts())
    }

    verifiedProduct=(data)=>{
        if(data){
            return data.map((items,idx)=>{
                return(
                    <tr key={idx}>
                        {
                        items.verified === true?
                        <td><b style={{color:"green"}}>Verified</b></td>
                        :
                        <td>Not Verified</td>
                        }
                        <td>{items._id}</td>
                        <td><Avatar alt="Remy Sharp" src={items.thumb}/></td>
                        <td>{items.name.substring(0,25)}...</td>
                        <td>{items.brand}</td>
                        <td>{items.price}</td>
                        <td>{items.description.substring(0,50)}...</td>
                        <td>{items.quantity_available}</td>
                        <td>{items.quantity_ordered}</td>
                        <td>{items.category_id}</td>
                        <td>{items.createdAt.substring(0,25)}</td>
                    </tr>
                )
            })
        }
    }



    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px",overflow:"auto"}}>
                <Link to="/myaccount" style={{textDecoration:"none",padding:"20px"}}>
                        <h5 style={{color:"black"}}>&#60; Back to my account</h5>
                    </Link>
                <h5>List Of Verified Products</h5>

                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Verified Status</th>
                        <th>Product ID</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Quantity Available</th>
                        <th>Quantity Order</th>
                        <th>Category ID</th>
                        <th>Publish On</th>
                        
                    </tr>
                    </thead>
                    <tbody>{this.verifiedProduct(this.props.vProduct)}</tbody>
                </table>

            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        vProduct : state.Company.vProduct
    }
}

export default connect(mapStateToProps)(VerifiedProduct)