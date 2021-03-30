import React, { Component } from 'react'
import { getProducts } from '../action/Action'
import {connect} from 'react-redux'
import DisplayProducts from '../components/DisplayProducts'

class Product extends Component {

    componentDidMount(){
        const category_id = this.props.match.params.id
        this.props.dispatch(getProducts(category_id))
    }

    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px"}}>
                <h5>PRODUCTS</h5>
                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                
                <DisplayProducts data={this.props.products}/>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        products : state.Products.products
    }
}
export default connect(mapStateToProps)(Product)