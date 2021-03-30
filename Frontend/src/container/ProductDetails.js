import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getProductDetails } from '../action/Action'
import DisplayProductDetails from '../components/DisplayProductDetails'
import ProductReview from './ProductReview'

class ProductDetails extends Component {

    componentDidMount(){
        const product_id = this.props.match.params.id
        this.props.dispatch(getProductDetails(product_id))
    }

    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px"}}>
                <h5>PRODUCT DETAILS</h5>
                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                <DisplayProductDetails data = {this.props.pdetails}/>
                <ProductReview data = {this.props.pdetails}/>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        pdetails : state.Products.productDetails
    }
}
export default connect(mapStateToProps)(ProductDetails)