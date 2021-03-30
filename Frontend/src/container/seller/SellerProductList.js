import React, { Component } from 'react'
import {Link} from "react-router-dom"
import Avatar from '@material-ui/core/Avatar';
import {connect} from 'react-redux'
import { getSellerProducts } from '../../action/Action';




class SellerProductList extends Component {

    constructor(){
        super()

        this.state = {
            success:"",
            error:""
        }
    }
    componentDidMount(){
        const profile = JSON.parse(localStorage.getItem('profile'))
        this.props.dispatch(getSellerProducts(profile._id))
    }

    handleDelete=(_id)=>{
        const profile = JSON.parse(localStorage.getItem('profile'))
        const productId = {productId:_id}
        fetch("https://swipeshopship.herokuapp.com/products/delete",{
            method:"DELETE",
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('loginToken')
            },
            body:JSON.stringify(productId)
        }).then(data=>data.json())
        .then(data=>{
            if(data.auth !== false){
                this.setState({success:data.message})
                this.props.dispatch(getSellerProducts(profile._id))
            }
            else{this.setState({error:data.message})}
        })
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
                    <td>{items.description.substring(0,50)}...</td>
                    <td>{items.quantity_available}</td>
                    <td>{items.quantity_ordered}</td>
                    {
                        items.verified === false?
                        <td>Not Verified</td>
                        :
                        <td>Verified</td>
                    }
                    <td>{items.createdAt.substring(0,25)}</td>
                    
                    <td>
                        <Link to={`/myaccount/sellerproducts/edit/${items._id}`}>
                        <button className="btn btn-light">
                            Edit
                        </button>
                        </Link>
                    </td>

                    <td>
                        <button className="btn btn-light" type="submit"  onClick={() => this.handleDelete(items._id)}>
                            Delete
                        </button>
                    </td>

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
                <h5>List Of Publish Products</h5>

                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>

                <p style={{color:"red"}}>{this.state.error}</p>
                <p style={{color:"green"}}>{this.state.success}</p>
                {
                    this.props.sellerProducts && this.props.sellerProducts.length !== 0?
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Category ID</th>
                        <th>Product ID</th>
                        <th>Product Image</th>
                        <th>Product Name</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Quantity Available</th>
                        <th>Quantity Order</th>
                        <th>Verified Status</th>
                        <th>Publish On</th>
                        <th>Edit Product</th>
                        <th>Delete Product</th>
                    </tr>
                    </thead>
                    <tbody>{this.renderProducts(this.props.sellerProducts)}</tbody>
                </table>
                :
                <center style={{marginTop:"10%",marginBottom:"10%"}}>
                    <h1>Oops ! Yet not publish any products</h1>
                    <Link to="/myaccount/addproduct">
                        <button className="btn btn-light">Publish product</button>
                    </Link>
                </center>
                }
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state.Products.sellerProducts)
    return{
        sellerProducts : state.Products.sellerProducts
    }
}

export default connect(mapStateToProps)(SellerProductList);