import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import TextField from '@material-ui/core/TextField';
import companySignin from '../assets/companySignin.jpg'

class CompanySignIn extends Component {
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
  
      fetch("https://swipeshopship.herokuapp.com/login/company",{
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

          localStorage.setItem('loginToken',data.token)
          localStorage.setItem('profile',JSON.stringify(data.profile))
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
            <img style={{width:"100%"}} src={companySignin} alt="signin"/>
          </div>

            <div className="col-md-6">

                <center>
                <h5>Company Sign in</h5>
                <div style={{backgroundColor:"yellow",width:"20%",height:"0.5vh", marginBottom:"20px"}}></div>
                Sign in to your Swipe'Shop'Ship Company Account.
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
                Company SignIn
                </button>

                <p>Not an employee?<Link to="/signin">SignIn</Link></p>

            </div>
          
        </div>
      </div>
    );
  }
}

export default connect(null,null)(CompanySignIn);
