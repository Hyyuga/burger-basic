import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from "react-router-dom";
import {connect} from "react-redux";

import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
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
          ingredients={this.props.ingr} 
          // ingredients={this.props.location.state.ingredients}
          onCheckoutCancelled = {this.onCheckoutCancelled}
          onCheckoutContinued = {this.onCheckoutContinued}
        />
        <Route 
          path={this.props.match.path + "/contact-data"} component={ContactData}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    ingr: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout);
