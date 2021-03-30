import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { getProfile } from '../action/Action'
import TextField from '@material-ui/core/TextField';


class Profile extends Component {

    constructor(){
        super()

        this.state={
            newname:"",
            success:"",
            error:"",
            oldpassword:"",
            newpassword:"",
            confirmpassword:"",
            success2:"",
            error2:""
        }
    }

    componentDidMount(){
        this.props.dispatch(getProfile())
    }

    handleUpdateName=(event)=>{
        event.preventDefault()
        console.log(this.state)
       
        const aToken = localStorage.getItem('loginToken')

        if(this.state.newname){

            fetch('https://swipeshopship.herokuapp.com/profile/updatename',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token': aToken
                },
                body:JSON.stringify({newname:this.state.newname})
            })
            .then(data=>data.json())
            .then(data=>{
                if(data.auth!==false){
                    this.setState({success:data.message,error:""})
                }
                else{
                    this.setState({error:data.message,success:""})
                }
            })
        }
        else{
            this.setState({error:"Seems you haven't change anything.", success:""})
        }
    }
    
    handleChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleUpdatePassword=(event)=>{
        console.log(this.state)
        if(this.state.oldpassword && this.state.newpassword && this.state.confirmpassword){

            if(this.state.newpassword === this.state.confirmpassword){

                const aToken = localStorage.getItem('loginToken')

                fetch('https://swipeshopship.herokuapp.com/profile/updatepassword',{
                method:"POST",
                headers:{
                    'Content-Type':'application/json',
                    'x-access-token': aToken
                },
                body:JSON.stringify({
                    newpassword:this.state.newpassword,
                    oldpassword:this.state.oldpassword
                    })
                })
                .then(data=>data.json())
                .then(data=>{
                if(data.auth!==false){
                    this.setState({success2:data.message,error2:""})
                }
                else{
                    this.setState({error2:data.message,success:""})
                }
            })
            }
            else{
                this.setState({error2:"Password mismatch"})
            }
        }
        else{
            this.setState({error2:"All fields are required"})
        }
    }

    render() {
        return (
            <div className="container" style={{marginTop:"20px",marginBottom:"20px"}}>

                <Link to="/myaccount" style={{textDecoration:"none",padding:"20px"}}>
                    <h5 style={{color:"black"}}>&#60; Back to my account</h5>
                </Link>
            

                <h5>My Profile</h5>

                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>

                <div className="row">
                    <div className="col-md-6">
                        {
                        this.props.profile?
                        <div>
                            <p>
                                <TextField defaultValue={this.props.profile._id} label="User ID" disabled/>
                            </p>
                            <p>
                                <TextField defaultValue={this.props.profile.name} onChange={(e)=>this.setState({newname:e.target.value})} label="Fullname" />
                                <p style={{color:"green"}}>{this.state.success}</p>
                            </p>
                            <p>
                                <TextField defaultValue={this.props.profile.email} label="Email" disabled/>
                            </p>
                            <p>
                                <TextField defaultValue={this.props.profile.password} label="Password" type="password" disabled />
                            </p>


                            <p style={{color:"tomato", cursor:"pointer"}}>Change password</p>



                            <p>
                                <TextField defaultValue={this.props.profile.role} label="Role" disabled/>
                            </p>

                            <button onClick={this.handleUpdateName} style={{fontSize:"20px",padding:"10px", backgroundColor:"teal"}}>
                            SAVE CHANGES
                            </button>

                            <p style={{color:"red"}}>{this.state.error}</p>
                        </div>
                        :
                        null
                        }
                    </div>

                    <div className="col-md-6">
                        <div>
                            <h5>Change Password</h5>
                            {this.props.profile?this.props.profile.email:null}
                            <p style={{color:"red"}}>{this.state.error2}</p>
                            <p style={{color:"green"}}>{this.state.success2}</p>
                            <p>
                                <TextField type="password" name="oldpassword" label="Enter Old password" onChange={this.handleChange}/>
                            </p>
                            <p>
                                <TextField type="password" name="newpassword" label="Enter New Password" onChange={this.handleChange}/>
                            </p>
                            <p>
                                <TextField type="password" name="confirmpassword" label="Confirm New Password" onChange={this.handleChange}/>
                            </p>

                            <button onClick={this.handleUpdatePassword} style={{fontSize:"20px",padding:"10px", backgroundColor:"teal"}}>
                            UPDATE PASSWORD
                            </button>

                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    console.log(state.Profile.profileData)
    return{
        profile:state.Profile.profileData
    }
}

export default connect(mapStateToProps)(Profile)