import React, { Component } from 'react'
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  }

  addIngredientHandler = (type) => {
    console.log("clicked");

    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
        ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchasableState(updatedIngredients);
  }

  updatePurchasableState = (ingredients) => {
    let sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      } , 0);

      this.setState({purchasable: sum > 0});
  }

  removeingredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount > 0){
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
          ...this.state.ingredients
      };
      updatedIngredients[type] = updatedCount;
      
      const priceSubtraction = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceSubtraction;

      this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
      this.updatePurchasableState(updatedIngredients);
    } else {
      return;
    }
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseContinueHandler = () => {
    alert("dO coNTINUE");
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0
    }
    // console.log(disableInfo);
    
    return (
      <>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary 
            ingredients={this.state.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            totalPrice={this.state.totalPrice}
            />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls 
          ingredientAdded={this.addIngredientHandler} 
          ingredientRemoved={this.removeingredientHandler} 
          disabled={disableInfo}
          price={this.state.totalPrice} 
          purchasable={this.state.purchasable}  
          ordered={this.purchaseHandler}
          />
      </>
    );
  }
}