import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import signIn from '../assets/signIn.png'

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email:"",
      password:"",
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
  
    if(this.state.email && this.state.password){

      const loginDetails = {
        email:this.state.email, 
        password:this.state.password
      }
  
      fetch("https://swipeshopship.herokuapp.com/login",{
        method:"POST",
        headers:{
          'Content-Type':'application/json'},
  
        body:JSON.stringify(loginDetails)
      })
      .then(data=>data.json())
      .then(data=>{
        if(data.auth===false){
          this.setState({failed:data.message})
        }
        else{
          // console.log(data)
          localStorage.setItem('loginToken',data.token)
          localStorage.setItem('profile',JSON.stringify(data.profile))
          // this.props.dispatch(getProfile())
        
          this.props.history.push('/')
         
        }
      })
    }

    else{
      this.setState({failed:"Enter the details"})
    }
    
  }


  render() {
    return (
      <div className="container" style={{marginTop:"20px",marginBottom:"20px"}}>

        <div className="row">

          <div className="col-md-6">
            <img style={{width:"100%"}} src={signIn} alt="signin"/>
          </div>

            <div className="col-md-6">

                <center>
                <h5>Sign in</h5>
                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                Sign in to your Swipe'Shop'Ship account.
                </center>

                <p style={{ color: "red" }}>{this.state.failed}</p>

                <p>
                  <TextField className="form-control" type="text" name="email" onChange={this.handleChange} label="Enter your email"/>
                </p>

                <br />

                <p>
                  <TextField className="form-control" type="password" name="password" onChange={this.handleChange} label="Enter your password"/>
                </p>
                <br />

                <button className="form-control" type="submit" onClick={this.handleSubmit}>
                SignIn
                </button>

                <p>Don't have an account?<Link to="/signup">SignUp</Link></p>
                <p>Sign In as a Company?<Link to="/company_signin">Company SignIn</Link></p>
            </div>
          
        </div>
      </div>
    );
  }
}

export default connect(null,null)(SignIn);
