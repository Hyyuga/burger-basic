import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from "react-router-dom";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
        // ['salad', '1']
        if(param[0] === "price"){
          price = param[1];
        } else {
          ingredients[param[0]] = +param[1];
        }
    }
    this.setState({ingredients: ingredients, totalPrice: price});
  }

  onCheckoutCancelled = () => {
    this.props.history.goBack();
  }

  onCheckoutContinued = () => {
    this.props.history.replace({
      pathname: "/checkout/contact-data",
      // state:{ ingredients: this.state.ingredients }
    })
  }

  render() {
    console.log("checkout render", this.props.match.path + "/contact-data");
    
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients} 
          // ingredients={this.props.location.state.ingredients}
          onCheckoutCancelled = {this.onCheckoutCancelled}
          onCheckoutContinued = {this.onCheckoutContinued}
        />
        <Route 
          path={this.props.match.path + "/contact-data"} 
          // component={ContactData}
          render={(props)=>(<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}
        />
      </div>
    )
  }
}

export default Checkout;
