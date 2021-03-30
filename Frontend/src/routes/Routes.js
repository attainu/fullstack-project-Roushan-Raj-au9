import React from "react"
import {BrowserRouter, Route} from 'react-router-dom'
import Cart from "../container/Cart"
import Header from "../container/Header"
import Footer from "../container/Footer"
import LandingPage from "../container/LandingPage"
import Product from "../container/Product"
import ProductDetails from "../container/ProductDetails"
import SignIn from "../container/SignIn"
import SignUp from "../container/SignUp"
import UserAccount from "../container/UserAccount"
import Wishlist from "../container/Wishlist"
import Profile from "../container/Profile"
import AddProduct from "../container/seller/AddProduct"
import SellerProductList from "../container/seller/SellerProductList"
import EditProduct from "../container/seller/EditProduct"
import Myorders from "../container/Myorders"
import BuyersList from "../container/company/BuyersList"
import SellerList from "../container/company/SellerList"
import VerifiedProduct from "../container/company/VerifiedProduct"
import NotVerifiedProduct from "../container/company/NotVerifiedProduct"
import CompanySigIn from "../container/CompanySigIn"


const Routes = () => {
    return(
        <BrowserRouter>
            <Header/>
            
            <Route path='/' exact component={LandingPage}/>

            <Route path='/signin' component={SignIn}/>
            <Route path='/company_signin' component={CompanySigIn}/>
            <Route path='/signup' component={SignUp}/>

            <Route path='/product/:id' exact component={Product}/>
            <Route path='/product/details/:id' component={ProductDetails}/>

            <Route path='/cart' component={Cart}/>

            <Route path='/wishlist' component={Wishlist}/>

            <Route path="/myaccount" exact component={UserAccount}/>

            <Route path="/myaccount/profile" component={Profile}/>
            <Route path="/myaccount/orders" component={Myorders}/>

            <Route path="/myaccount/addproduct" component={AddProduct}/>
            <Route path="/myaccount/sellerproducts" exact component={SellerProductList}/>
            <Route path="/myaccount/sellerproducts/edit/:id" component={EditProduct}/>
        
            <Route path="/myaccount/buyers" component={BuyersList}/>
            <Route path="/myaccount/sellers" component={SellerList}/>
            <Route path="/myaccount/verifiedproducts" component={VerifiedProduct}/>
            <Route path="/myaccount/notverifiedproducts" component={NotVerifiedProduct}/>

            <Footer/>
        </BrowserRouter>
    )
}

export default Routes;