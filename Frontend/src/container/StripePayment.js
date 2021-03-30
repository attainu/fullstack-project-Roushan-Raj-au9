import React, { Component } from 'react'
import StripeCheckout from "react-stripe-checkout"
import {emptyCart} from "../action/Action"
import {connect} from 'react-redux'


class StripePayment extends Component {

    constructor(props){
        super(props)

        this.state={
            success:false
        }
    }

    makePayment=()=>{
        console.log("inside make payment")
        this.props.dispatch(emptyCart())
        alert("Your Order has been placed")
    }

    renderStripeButton=()=>{
        return(

            <StripeCheckout
            stripeKey="pk_test_51IacUHSEYmkG8lIHlD85jPZTKAMLmxJaY6QjzA9tTVx21F2hEQxitzgCSDvRBX97DRbZ6fI7iKm7mePAPLBKQnzl00PsOIpUgY"
            token={this.makePayment}
            amount={(this.props.totalprice+40)*100}
            name="Order payment"
            shippingAddress
            billingAddress
            >
            <button style={{float:"right"}} className="btn btn-light">Pay with stripe</button>
        </StripeCheckout>
        )
    }

    render() {

        return (
            <div>
                {this.renderStripeButton()}
            </div>
        )
    }
}
export default connect(null,null)(StripePayment)