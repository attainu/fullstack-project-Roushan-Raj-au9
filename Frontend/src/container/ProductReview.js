import React, { Component } from 'react'
import {connect} from 'react-redux'
import { getProductDetails } from '../action/Action'

class ProductReview extends Component {
    constructor(props){
        super(props)

        this.state={
            review:"",
            success:"",
            error:""
        }
    }

    handlesubmit=(event)=>{
        event.preventDefault()
        
        const aToken = localStorage.getItem('loginToken')
        const profile = JSON.parse(localStorage.getItem("profile"));

        if(this.state.review){

            const reviewData = {
                review : this.state.review,
                postBy : profile.name,
            }

            fetch(`https://swipeshopship.herokuapp.com/products/add_review/${this.props.data._id}`,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token': aToken
                },
                body:JSON.stringify(reviewData)
            })
            .then(data=>data.json())
            .then(data=>{
                if(data.auth !== false){
                    this.setState({success:data.message,error:""})
                    this.props.dispatch(getProductDetails(this.props.data._id))
                }
                else{this.setState({success:"", error:data.message})}
            })
        }
        else{
            this.setState({error:"Empty review can't be accepted", success:""})
        }
    }


    renderProductReview=({data})=>{
        if(data){

            return data.reviews.map((items)=>{
                return <div className="card" style={{padding:"20px"}}>
                    <p><i>{items.review}</i></p>
                    <p><b>By</b> {items.postBy}</p>
                    <p><b>Post on</b> {items.postOn}</p>
                </div>
            })
        }
    }

    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px"}}>

                <div>
                    <h5>Write your review</h5>
                    <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>

                    <div style={{display:"flex"}}>
                        <input placeholder="write your review" className="form-control" onChange={(e)=>this.setState({review:e.target.value})}/>
                        <button type="submit" className="btn btn-light" onClick={this.handlesubmit}>Submit</button>
                    </div>

                    <span style={{color:"red"}}>{this.state.error}</span>
                    <span style={{color:"green"}}>{this.state.success}</span>
                </div>

                <div>
                    <h5>Product review</h5>
                    <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                    <div style={{overflow:"auto", height:"50vh"}}>
                        {this.renderProductReview(this.props)}
                    </div>
                </div>

            </div>
        )
    }
}

export default connect(null,null)(ProductReview);