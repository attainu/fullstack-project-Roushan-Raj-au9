import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from "react-redux"
import { addToCart, getWishlist, removeFromWishlist } from '../action/Action'


class Wishlist extends Component {

    componentDidMount(){
        this.props.dispatch(getWishlist())
    }


    renderProducts = (data) => {
        if(data){
            return data.map((items,idx)=>{
                return (
                    <div className="displayProducts card col-md-3" key={idx}>
                    
                    <center>
                        <img src={items.thumb} alt="categoryImg"/>
                        <Link to={`/product/details/${items._id}`}>
                            <p >{items.name}</p>
                        </Link>
                        <p>Price <b>{'\u0024'} {items.price} </b></p>
                        {
                            items.shipping==true?
                            <p>Availability <b>{items.quantity_available}</b></p>:
                            <p>Availability <b>Out of Stock</b></p>
                        }

                        <div style={{display:"flex"}}>

                        <button onClick={()=>this.props.dispatch(addToCart(items))} className="btn btn-light">add to cart</button>
                    
                        <button onClick={()=>this.props.dispatch(removeFromWishlist(items._id))} className="btn btn-light">remove from wishlist</button>
                        </div>
                    </center>
                </div>
                )
            })
        }
    }


    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px"}}>
                <h5>WISHLIST PRODUCTS</h5>
                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                {
                    this.props.wishlist_products && this.props.wishlist_products.length !== 0?
                    <div className="row">
                        {this.renderProducts(this.props.wishlist_products)}
                    </div>
                    :
                    <center style={{marginTop:"10%",marginBottom:"10%"}}>
                        <h1>Ooops !! Your Wishlist is Empty</h1>
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
    return{
        wishlist_products:state.Profile.wishlistProducts
    }
}

export default connect(mapStateToProps)(Wishlist)