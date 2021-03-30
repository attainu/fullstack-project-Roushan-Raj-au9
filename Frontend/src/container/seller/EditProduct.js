import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getProductDetailsEdit, getCategory } from '../../action/Action'
import TextField from '@material-ui/core/TextField';


class EditProduct extends Component {

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
            uploading:false,
            success:"",
            error:"",
        }
    }

    componentDidMount(){
        const product_id = this.props.match.params.id
        this.props.dispatch(getProductDetailsEdit(product_id))
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

        const productData = {
            name:this.state.name?this.state.name:this.props.pdetails.name,

            brand:this.state.brand?this.state.brand:this.props.pdetails.brand,

            description:this.state.description?this.state.description:this.props.pdetails.description,

            price:this.state.price?this.state.price:this.props.pdetails.price,

            thumb:this.state.thumb?this.state.thumb:this.props.pdetails.thumb,

            quantity_available:this.state.quantity_available?this.state.quantity_available:this.props.pdetails.quantity_available,

            shipping:this.state.shipping?this.state.shipping:this.props.pdetails.shipping,

            category_id:this.state.category_id?this.state.category_id:this.props.pdetails.category_id,
        }

        fetch(`https://swipeshopship.herokuapp.com/products/update_product/${this.props.pdetails._id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('loginToken')
            },
            body:JSON.stringify(productData)
        }).then(data=>data.json())
        .then(data=>{
            console.log(data)
            if(data.auth!==false){
                this.setState({success:data.message, error:""})
                const product_id = this.props.match.params.id
                this.props.dispatch(getProductDetailsEdit(product_id))
            }
            else{this.setState({error:data.message,success:""})}
        })
    }

    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px"}}>
                <Link to="/myaccount/sellerproducts" style={{textDecoration:"none",padding:"20px"}}>
                    <h5 style={{color:"black"}}>&#60; Back to Publish product List</h5>
                </Link>
            

                <h5>Edit Product</h5>

                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>

                <div className="row">
                    <div className="col-md-6">
                    {
                    this.props.pdetails?
                    <div>

                        <p><TextField name="name" defaultValue={this.props.pdetails.name} onChange={this.handleChange} type="text"  multiline label="Product name" className="form-control" />  </p>

                        <p><TextField name="brand" defaultValue={this.props.pdetails.brand} onChange={this.handleChange} type="text"  label="Brand" /></p>

                        {/* <p><TextField name="description" defaultValue={this.props.pdetails.description} onChange={this.handleChange} type="text" multiline label="Description" className="form-control"/></p> */}

                        <p style={{color:"grey"}}>
                            Description
                            <textarea style={{color:"black",whiteSpace:"pre-wrap", textIndent:"50px"}} rows="15" name="description" defaultValue={this.props.pdetails.description} onChange={this.handleChange} className="form-control"/>
                        </p>
                        <p><TextField name="price" defaultValue={this.props.pdetails.price} onChange={this.handleChange} type="number" label="Price"  /></p>

                        <p><TextField name="quantity_available" defaultValue={this.props.pdetails.quantity_available} onChange={this.handleChange} type="number" label="Quantity" /></p>
                        

                        <p><select name="category_id" defaultValue={this.props.pdetails.category_id} onChange={this.handleChange} className="form-control">

                            <option disabled selected>Select...</option>
                            {this.renderCategory(this.props.productCategory)}

                        </select></p>

                        <button onClick={this.handleSubmit} style={{fontSize:"20px",padding:"10px", backgroundColor:"teal"}}>
                        SAVE CHANGES
                        </button>

                        <span style={{color:"red"}}>{this.state.error}</span>
                        <span style={{color:"green"}}>{this.state.success}</span>
                    </div>
                    :
                    null
                    }
                    </div>

                    <div className="col-md-6 card">
                    {
                        this.props.pdetails?
                        <div>
                        <img src={this.props.pdetails.thumb} alt="pImage"/>
                        <h5>Change Product Image</h5>
                        <p><TextField name="thumb" onChange={this.handleFileChange} accept="image/*" type="file" label="Image"  helperText="Please select product image"/>
                        {
                            this.state.uploading?
                            <p style={{color:"red"}}>Uploading...</p>
                            :null
                            }
                        </p>
                        </div>
                        :null
                        }
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        pdetails : state.Products.productDetailsEdit,
        productCategory: state.ProductCategory.categories
    }
}

export default connect(mapStateToProps)(EditProduct)