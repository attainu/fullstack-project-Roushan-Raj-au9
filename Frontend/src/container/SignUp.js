import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import signUp from '../assets/signUp.png'

class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      name:"",
      email:"",
      password:"",
      role:"",
      success:"",
      failed: ""
    };
  }


  handleChange=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }


  handleSubmit=(event)=>{
    event.preventDefault()

    const userData = {
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      role:this.state.role
    }
    console.log(userData)
    fetch('https://swipeshopship.herokuapp.com/register',{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(userData)
    })
    .then(data=>data.json())
    .then(data=>{
      if(data.auth===false){
        this.setState({failed:data.message,success:""})
      }
      else{this.setState({failed:"",success:data.message})}
    })
  }

  render() {
    return (
      <div className="container" style={{marginTop:"20px",marginBottom:"20px"}}>

        <div className="row">

          <div className="col-md-6">
            <img style={{width:"100%"}} src={signUp} alt="signup"/>
          </div>

            <div className="col-md-6">

                <center>
                  <h5>Let's get started on your new account.</h5>
                  <div style={{backgroundColor:"yellow",width:"50%",height:"0.5vh", marginBottom:"20px"}}></div>
                </center>

                <p style={{ color: "red" }}>{this.state.failed}</p>
                <p style={{ color: "green" }}>{this.state.success}</p>

                <p>
                  <TextField className="form-control" type="text" name="name" onChange={this.handleChange} label="Enter your full name"/>
                </p>
                <br />
                
                <p>
                  <TextField className="form-control" type="email" name="email" onChange={this.handleChange} label="Enter your email"/>
                </p>
                <br />

                
                <TextField className="form-control" type="password" name="password" onChange={this.handleChange} label="Enter your password" />

                <br />
                <br />

                <h6>Select Role</h6>
                <select name="role" onChange={this.handleChange} className="custom-select">
                  <option defaultValue="Select" selected disabled>Select...</option>
                  <option defaultValue="buyer">buyer</option>
                  <option defaultValue="seller">seller</option>
                </select>

                <button style={{marginTop:"20px"}} className="form-control" type="submit" onClick={this.handleSubmit}>
                SignUp
                </button>

                Don't have an account?<Link to="/signin">SignIn</Link>
            </div>
          
        </div>
      </div>
    );
  }
}

export default SignUp;
