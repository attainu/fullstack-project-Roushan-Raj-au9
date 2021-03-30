import React from 'react'
import './displayCategory.css'
import {Link} from 'react-router-dom'

const DisplayCategory = (props) => {
    // console.log(props)
    const renderCategory = ({data}) => {
        if(data){
            // console.log("??????",data)
            return data.map((items)=>{
                return(
                    <div className="displayCategory col-md-4" key={items._id}>

                        <Link to={`/product/${items.category_id}`}>

                        <center className="category_container">
                            <img src={items.category_thumb} alt="categoryImg" class="image"/>
                            <div className="overlay">
                                <div className="text">
                                    <h4>{items.category_name}</h4>
                                    <h6>See All</h6>
                                </div>
                            </div> 
                        </center>

                        </Link>

                    </div>
                )
            })
        }
    }

    return (
        <div className="container">

            <div className="row" id="displayCategory">

                {renderCategory(props)}

            </div>

        </div>
    )
}
export default DisplayCategory;