import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getCategory, getProfile } from '../../action/Action';
import TextField from '@material-ui/core/TextField';


class AddProduct extends Component {

    constructor(){
        super()

        this.state={
            name:"",
            brand:"",
            description:"",
            price:"",
            thumb:"",
            quantity_available:"",
            shipping:"",
            category_id:"",
            seller_id:"",
            seller_name:"",
            uploading:false,
            success:"",
            error:"",
        }
    }

    componentDidMount(){
        this.props.dispatch(getProfile())
        this.props.dispatch(getCategory())
    }

    renderCategory=(data)=>{
        if(data){
            return data.map(items=>{
                return <option key={items.category_id} value={items.category_id}>
                    {items.category_name}
                </option >
            })
        }
    }

    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleFileChange = (event) => {
        this.setState({uploading:true})
        
        const formData = new FormData();
        formData.append("file", event.target.files[0])
        formData.append("upload_preset", "sxiolm8e")

        fetch("https://api.cloudinary.com/v1_1/dlckbbpvz/image/upload",{
            method:"POST",
            body:formData
        }).then(data=>data.json())
        .then(data=>{
            this.setState({thumb:data.url})
            this.setState({uploading:false})
        })
    }

    handleSubmit=(event)=>{
        event.preventDefault()
        console.log(this.state)
        const productData = {
            name:this.state.name,
            brand:this.state.brand,
            description:this.state.description,
            price:this.state.price,
            thumb:this.state.thumb,
            quantity_available:this.state.quantity_available,
            shipping:this.state.shipping,
            category_id:this.state.category_id,

            seller_id:this.props.profile._id,
            seller_name:this.props.profile.name,
        }
        fetch("https://swipeshopship.herokuapp.com/products/add_products",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('loginToken')
            },
            body:JSON.stringify(productData)
        }).then(data=>data.json())
        .then(data=>{
            console.log(data)
            if(data.auth!==false){this.setState({success:data.message, error:""})}
            else{this.setState({error:data.message,success:""})}
        })
    }

    render() {
        return (
            <div className="row justify-content-md-center" style={{marginTop:"20px",marginBottom:"20px"}}>
                <div className="col-md-7">

                    <Link to="/myaccount" style={{textDecoration:"none",padding:"20px"}}>
                        <h5 style={{color:"black"}}>&#60; Back to my account</h5>
                    </Link>
                

                    <h5>Add Product</h5>

                    <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                        
                    {
                    this.props.profile?
                    <div>
                    
                        <p><TextField name="name" onChange={this.handleChange} type="text"  multiline label="Product name" className="form-control" />  </p>
                    
                
                        <p><TextField name="brand" onChange={this.handleChange} type="text"  label="Brand" /></p>
                    
                
                        <p style={{color:"grey"}}>
                            Description
                            <textarea style={{whiteSpace:"pre-wrap", textIndent:"50px"}} rows="15" name="description" onChange={this.handleChange} className="form-control"/>
                        </p>
                    
                
                        <p><TextField name="price" onChange={this.handleChange} type="number" label="Price"  /></p>
                    
                
                        <p><TextField name="thumb" onChange={this.handleFileChange} accept="image/*" type="file" label="Image"  helperText="Please select product image"/>
                        {
                            this.state.uploading?
                            <p style={{color:"red"}}>Uploading...</p>
                            :null
                            }
                        </p>
                    
                
                        <p><TextField name="quantity_available" onChange={this.handleChange} type="number" label="Quantity" /></p>
                        

                        <p><select name="category_id" onChange={this.handleChange} className="form-control">

                            <option disabled selected>Select...</option>
                            {this.renderCategory(this.props.productCategory)}

                        </select></p>

                        <button onClick={this.handleSubmit} style={{fontSize:"20px",padding:"10px", backgroundColor:"teal"}}>
                        Add Product
                        </button>

                        <span style={{color:"red"}}>{this.state.error}</span>
                        <span style={{color:"green"}}>{this.state.success}</span>
                    </div>
                    :
                    null
                    }
            
                </div>

            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state.Profile.profileData)
    return{
        profile:state.Profile.profileData,
        productCategory: state.ProductCategory.categories
    }
}

export default connect(mapStateToProps)(AddProduct)