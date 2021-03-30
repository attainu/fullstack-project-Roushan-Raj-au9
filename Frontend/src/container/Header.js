import React from "react";
import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { removeProfile } from "../action/Action";

class Header extends Component {

  logout = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("profile");
    this.props.dispatch(removeProfile());
    this.props.history.push("/");
  };

  render() {

    const profile = JSON.parse(localStorage.getItem("profile"));

    return (
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">


        <Link to="/" style={{ textDecoration: "none" }}>
          <h3 style={{ color: "black" }}>Swipe Shop Ship</h3>
        </Link>
        

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          <ul className="navbar-nav mr-auto"></ul>

          <form className="form-inline my-2 my-lg-0">

            <div style={{ marginRight: "10px" }}>

              {localStorage.getItem("profile") && profile.role === "seller" ? 
              
              <span style={{marginLeft:"20px",color:"red"}}>Seller Account</span> : null}

              {localStorage.getItem("profile") && profile.role === "company" ? 
              
              <span style={{marginLeft:"20px",color:"red"}}>Company Account</span> : null}

                <Link to="/cart">
                  <ShoppingCartIcon style={{ color: "black" }} />
                  <span style={{ height: "18px" }} className="badge badge-danger">
                    {this.props.numOfCartProducts}
                  </span>
                </Link>

            </div>

            <ul className="navbar-nav mr-auto">
              
              {localStorage.getItem("profile") ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {/* Hi ! {this.props.profile.name} */}
                    Welcome {profile.name}
                  </a>

                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/myaccount" className="dropdown-item" href="#">
                      My Account
                    </Link>
                    <Link to="/wishlist" className="dropdown-item" href="#">
                      wishlist
                    </Link>
                    <p
                      className="dropdown-item"
                      style={{ cursor: "pointer" }}
                      onClick={this.logout}
                    >
                      SignOut
                    </p>
                  </div>
                </li>
              ) : (
                <Link to="/signin">
                  <button className="form-control">SignIn</button>
                </Link>
              )}
            </ul>
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.Profile.profileData,
    numOfCartProducts: state.AddToCart.cartProducts.length,
  };
};

Header = withRouter(Header);
export default connect(mapStateToProps)(Header);
