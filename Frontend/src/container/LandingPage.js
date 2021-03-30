import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getAllProducts, getCategory } from '../action/Action'
import DisplayCategory from '../components/DisplayCategory'
import DisplayProducts from '../components/DisplayProducts'
import './landingpage.css'

class LandingPage extends Component {

    constructor(){
        super()

        this.state={
            searchData:""
        }
    }
    
    componentDidMount(){
        this.props.dispatch(getCategory())
        this.props.dispatch(getAllProducts())
    }


    handleChange=(event)=>{
        if(this.props.allProducts){
            this.setState({
                searchData : this.props.allProducts.filter(items=>{
                    return(
                        items.name.toLowerCase().indexOf(event.target.value.toLowerCase())>-1 
                    )
                })
            })
        }
    }

    render() {
        return (
            <div className="container" style={{marginTop:"20px"}}>
                <div className="search">
                    <div className="input">
                        <h3>SEARCH PRODUCTS</h3>
                        <input className="form-control" onChange={this.handleChange} placeholder="search products..."/>
                    </div>

                </div>
                {
                    this.state.searchData.length !== 0 ?
                    <div className="search_result">
                        <h5>SEARCH RESULTS</h5>
                        <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh",marginBottom:"20px"}}></div>
                        <DisplayProducts data={this.state.searchData}/>
                    </div>
                    :
                    null

                }
                {
                    this.state.searchData !== "" && this.state.searchData.length === 0 ?
                    <div className="search_result">
                        <h5>SEARCH RESULTS</h5>
                        <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                        <h5>No product found !</h5>
                    </div>
                    :
                    null

                }
                <hr/>
                <h5>PRODUCT CATEGORY</h5>
                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh"}}></div>
                <DisplayCategory data = {this.props.category}/>
            </div>
        )
    }
}


const mapStateToProps=(state)=>{
    return{
        category : state.ProductCategory.categories,
        allProducts : state.Products.allproducts
    }
}


export default connect(mapStateToProps)(LandingPage);