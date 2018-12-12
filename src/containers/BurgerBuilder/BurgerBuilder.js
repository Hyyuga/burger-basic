import React, { Component } from 'react'
import {connect} from "react-redux";

import axios from "../../axios-orders"
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }
  componentDidMount () {
    this.props.onSetIngredients();
  }

  isPurchasable = (ingredients) => {
    let sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      } , 0);

      return sum > 0;
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseContinueHandler = () => {
    this.props.onInitOrder();
    this.props.history.push({
      pathname: "/checkout",
    });
  }

  render() {
    const disableInfo = {
      ...this.props.ingr
    };
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null
    
    let burger = this.props.err ? <p>Ingredients cant be reloaded</p> : <Spinner />
    if(this.props.ingr){
      burger = (
        <>
          <Burger ingredients={this.props.ingr}/>
          <BuildControls 
            ingredientAdded={this.props.onAddIngredient} 
            ingredientRemoved={this.props.onRemoveIngredient} 
            disabled={disableInfo}
            price={this.props.totPrice} 
            purchasable={this.isPurchasable(this.props.ingr)}  
            ordered={this.purchaseHandler}
            />
          </>
      )
      orderSummary =   <OrderSummary 
      ingredients={this.props.ingr}
      purchaseCanceled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}
      totalPrice={this.props.totPrice}/>;
    }

    // console.log(this.props);
    
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapDispatchToState = dispatch => {
  return {
    onAddIngredient: (type) => dispatch(actionCreators.addIngredient(type)),
    onRemoveIngredient: (type) => dispatch(actionCreators.removeIngredient(type)),
    onSetIngredients: () => dispatch(actionCreators.initIngredients()),
    onInitOrder: () => dispatch(actionCreators.orderInit())
  }
}
const mapPropsToState = state => {
  return {
    ingr: state.burgerBuilder.ingredients,
    totPrice: state.burgerBuilder.totalPrice,
    err: state.burgerBuilder.error
  }
}
export default connect(mapPropsToState, mapDispatchToState) (withErrorHandler(BurgerBuilder, axios));