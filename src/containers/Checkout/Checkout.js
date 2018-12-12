import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import ContactData from "./ContactData/ContactData";
import * as actions from "../../store/actions/index";

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
    
    let summary = <Redirect to="/" />
    
    if(this.props.ingr){
      const purchasedRedirect = this.props.purch ? <Redirect to="/" /> : null;
      summary = (
        <div>
          {purchasedRedirect}
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
    return summary
  }
}

const mapStateToProps = state => {
  return{
    ingr: state.burgerBuilder.ingredients,
    purch: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout);
