import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import { getNvProducts } from '../../action/CompanyAction';

class NotVerifiedProduct extends Component {


    constructor(){
        super()

        this.state = {
            success:"",
            error:""
        }
    }


    componentDidMount(){
        this.props.dispatch(getNvProducts())
    }

    handleVerification=(productId)=>{

        fetch(`https://swipeshopship.herokuapp.com/products/verification/${productId}`,{
            method:"PUT",
            headers:{'x-access-token':localStorage.getItem('loginToken')}
        })
        .then(data=>data.json())
        .then(data=>
            {
                if(data.auth === true){
                    this.setState({success:data.message,error:""})
                    this.props.dispatch(getNvProducts())
                }
                else{
                    this.setState({success:"",error:data.message})
                }
            }
        )
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
                        <td>
                            <b style={{color:"red"}}>
                                Not Verified
                            </b>
                            <p onClick={()=>this.handleVerification(items._id)} style={{color:"blue",cursor:"pointer"}}>click to verify</p>
                        </td>
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
                <h5>List Of Not Verified Products</h5>
                <p style={{color:"green"}}>{this.state.success}</p>
                <p style={{color:"red"}}>{this.state.error}</p>

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
                    <tbody>{this.verifiedProduct(this.props.nvProduct)}</tbody>
                </table>

            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        nvProduct : state.Company.nvProduct
    }
}

export default connect(mapStateToProps)(NotVerifiedProduct)