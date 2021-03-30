import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { getBuyers } from '../../action/CompanyAction'

class BuyersList extends Component {
    constructor(){
        super()

        this.state = {
            buyers:""
        }
    }

    componentDidMount(){
       this.props.dispatch(getBuyers())
    }

    renderBuyers=(data)=>{
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
                <h5>List Of Buyers</h5>

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
                    <tbody>{this.renderBuyers(this.props.buyers)}</tbody>
                </table>

            </div>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        buyers : state.Company.buyers
    }
}

export default connect(mapStateToProps)(BuyersList)