import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import DisplayCartProducts from '../components/DisplayCartProducts'


class Cart extends Component {
    render() {
        // const cartProducts = JSON.parse(localStorage.getItem('cart'))
        // console.log("cart.js cart products",cartProducts)
        return (
            <div className="container"  style={{marginTop:"20px",marginBottom:"20px"}}>
                <h5>CART PRODUCTS</h5>
                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                
                {/* <DisplayCartProducts data={JSON.parse(localStorage.getItem('cart'))}/> */}

            {
                this.props.cartProducts.length !== 0?
                <div>
                    <DisplayCartProducts data={this.props.cartProducts}/>
                </div>
                :
                <center style={{marginTop:"10%",marginBottom:"10%"}}>
                    <h1>Ooops !! Cart is Empty</h1>
                    <Link to="/">
                        <button className="btn btn-light">Continue shopping</button>
                    </Link>
                </center>
                
            }
            </div>
            
        )
    }
}


const mapStateToProps=(state)=>{
    // console.log(state.AddToCart.cartProducts)
    return{
        cartProducts : state.AddToCart.cartProducts
    }
}

export default connect(mapStateToProps)(Cart);