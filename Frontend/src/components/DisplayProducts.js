import React from 'react'
import './displayProducts.css'
import {Link} from 'react-router-dom'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const DisplayProducts=(props)=> {

    const renderProducts = ({data}) => {
        if(data){
            return data.map((items)=>{
                return (
                    <div className="displayProducts card col-md-3" key={items._id}>
                    
                    <center>
                        <div>
                            <img src={items.thumb} alt="categoryImg"/>
                            <FavoriteBorderIcon className="heart"/>
                            {/* <i class="fas fa-heart"></i> */}
                        </div>
                       
                        <p >{items.name}</p>
                        <p>Price <b>{'\u0024'} {items.price} </b></p>
                        {
                            items.shipping==true?
                            <p>Availability <b>{items.quantity_available}</b></p>:
                            <p>Availability <b>Out of Stock</b></p>
                        }
                    
                    
                    <Link to={`/product/details/${items._id}`} style={{textDecoration:"none"}}>
                        <button className="form-control">view details</button>
                    </Link>
                   
                    </center>
                </div>
                )
            })
        }
    }


    return (
        <div className="container">

            <div className="row" id="displayProducts">

                {renderProducts(props)}

            </div>

        </div>
    )
}

export default DisplayProducts;