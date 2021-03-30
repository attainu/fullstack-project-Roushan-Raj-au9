import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { getSellers } from '../../action/CompanyAction'

class SellerList extends Component {

    constructor(){
        super()

        this.state = {
            sellers:""
        }
    }


    componentDidMount(){
        this.props.dispatch(getSellers())
    }


    renderSellers=(data)=>{
        if(data){
            return data.map((items,idx)=>{
                return(
                    <tr key={idx}>
                        <td>{items._id}</td>
                        <td>{items.name}</td>
                        <td>{items.email}</td>
                        <td>{items.password}</td>
                        <td>{items.role}</td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px",overflow:"auto"}}>
                <Link to="/myaccount" style={{textDecoration:"none",padding:"20px"}}>
                        <h5 style={{color:"black"}}>&#60; Back to my account</h5>
                    </Link>
                <h5>List Of Sellers</h5>

                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>

                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody>{this.renderSellers(this.props.sellers)}</tbody>
                </table>

            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        sellers : state.Company.sellers
    }
}

export default connect(mapStateToProps)(SellerList)