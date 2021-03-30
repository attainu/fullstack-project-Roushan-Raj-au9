import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {removeFromCart, addToWishlist} from '../action/Action'
import {connect} from 'react-redux'
import './displayCartProducts.css' 
import StripePayment from '../container/StripePayment'


class DisplayCartProducts extends Component{
    constructor(props){
        super(props)
    }

    renderCartProducts = ({data}) => {
       
        if(data){
            return data.map((items,idx)=>{
                return (
                    <div className="row displayCartProducts" key={idx}>

                        <div className="col-md-3">
                            <img style={{width:"100%"}} id="cartProductImage" src={items.thumb} alt="categoryImg"/>
                        </div>

                        <div className="col-md-9">

                        <center>
                            <Link to={`/product/details/${items._id}`}>
                                <p >{items.name}</p>
                            </Link>

                            <p>Price <b>{'\u0024'} {items.price} </b></p>

                            {
                                items.shipping==true?
                                <div style={{display:"flex"}}>
                                    <p>Quantity</p>
                                    <p>Available</p>
                                </div>
                                :
                                <p>Out of Stock</p>
                            }
                            
                            <div>
                                {
                                    localStorage.getItem('loginToken')?
                                    <button className="btn btn-light" onClick={()=>this.props.dispatch(addToWishlist(items._id))}>move to wishlist</button>
                                    :
                                    <Link to="/signin">
                                        <button className="btn btn-light">move to wishlist</button>
                                    </Link>
                                }
                        
                                <button 
                                className="btn btn-light" 
                                onClick={()=>this.props.dispatch(removeFromCart(items._id))}
                                >remove
                                </button>

                            </div>

                        </center>
                        </div>
                    </div>
                )
            })
        }
    }

    getPrice=({data})=>{

        if(data){
            let totalCost = 0;

            data.forEach(element => {
                totalCost += element.price
            });

            return totalCost
        }
    }

    render(){
        return (
            <div className="container">

            <div className="row">

                <div className="col-md-7 renderCart" style={{padding:"20px"}}>
                    {this.renderCartProducts(this.props)}
                </div>

                <div className="col-md-5 checkout">
                    <div><h6>Order Summary</h6></div>
                    <hr/>
                    Total MRP(Incl. of taxes) <span>{'\u0024'} {this.getPrice(this.props)}</span>
                    <br/>
                    
                    Delivery Fee <span>{'\u0024'} +40</span>
                    <br/>

                    <b>Subtotal <span>{'\u0024'} {this.getPrice(this.props)+40}</span></b>

                    <hr/>
                    {
                        localStorage.getItem('loginToken')?
                        <StripePayment totalprice = {this.getPrice(this.props)}/>
                        :
                        <Link to="/signin">
                            <button style={{float:"right"}} className="btn btn-light">SignIn</button>
                        </Link>
                    }
                </div>

            </div>

        </div>
    )
    }
}

export default connect(null,null)(DisplayCartProducts);