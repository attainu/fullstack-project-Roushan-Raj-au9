import React from "react";
import { Component } from "react";
import { addToCart } from "../action/Action";
import {connect} from "react-redux"

class DisplayProductDetails extends Component{

  addToCart=()=>{
    // console.log(this.props.data)
    this.props.dispatch(addToCart(this.props.data))
    // const cart = []
    // cart.push(this.props.data)
    // localStorage.setItem('cart', JSON.stringify(cart))
  }

  renderProductDetails = ({ data }) => {
    if (data) {
      return (
          <div>

            <div className="row">

                <div className="col-md-6 card" style={{padding:"20px"}}>
                    <img src={data.thumb} alt="productImg"/> 
                </div>

                <div className="card col-md-6"  style={{padding:"20px"}}>
                    <p>{data.name}</p>
                    <h4>{data.brand}</h4>
                    <h2>{'\u0024'} {data.price}</h2>
                    <b>Quantity available {data.quantity_available}</b>
                    {data.shipping?
                        <p style={{color:"green"}}>Shipping Available</p>:
                        <p>Shipping Not Available</p>
                    }
                    <h4>Description</h4>
                    <p>{data.description}</p>
                    <p>
                      <i>Seller name : </i>{data.seller_name}
                    </p>

                      {data.verified? <b style={{color:"green"}}>Assured by SwipeShopShip</b> :null}
                      
                    <p><i style={{color:"red"}}>launch dt. </i>{data.createdAt}</p>

                    <br/>
                    <button 
                    style={{backgroundColor:"orange"}} 
                    className="form-control"
                    onClick={this.addToCart}
                    >ADD TO CART</button>
                </div>
            </div>

        </div>
      );
    }
  };

  render(){
    return <div className="container">{this.renderProductDetails(this.props)}</div>;
  }
};

export default connect(null,null)(DisplayProductDetails);
