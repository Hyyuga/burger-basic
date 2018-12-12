import React, { Component } from 'react'
import {connect} from "react-redux";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner"
import  axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import * as actionCreators from "../../../store/actions/index";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler"

export class CheckoutData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode:  {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country:  {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email:  {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod:  {
        elementType: "select",
        elementConfig: {
          options: [{value: "fastest", displayValue: "Fastest"},
                    {value: "cheapest", displayValue: "Cheapest"}]
        },
        value: "fastest",
        validation: {},
        valid: false,
        touched: false
      },
    },
    formIsValid: false
  }

  // checkValidity(value, rules){
  //   let isValid = true;

  //   if(rules.required){
  //     isValid = value.trim() !== "" && isValid;
  //   }
  //   if(rules.minLength){
  //     isValid = value.length >= rules.minLength && isValid;
  //   }
  //   if(rules.maxLength){
  //     isValid = value.length <= rules.maxLength && isValid;
  //   }
  //   return isValid;
  // }

  checkValidity = (value, rules) => {
    if (rules.required && value.trim() == '') return false;
    if (rules.minLength && value.length > rules.minLength) return false;
    if (rules.maxLength && value.length < rules.maxLength) return false;
    return true;
  }

  orderClickedHandler = (event)  => {
    event.preventDefault();
    const formData = {};

    for(let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingr,
      price: this.props.totPrice,
      orderData: formData
    }
    console.log("ings", this.props.ingr);
    console.log("price", this.props.totPrice);
    
   this.props.onSubmitOrder(order);
  }
  
  inputChangedHandler = (inputIdentifier, event)=> {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    } 
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    // console.log(updatedFormElement);
    
    let formIsValid = true;

    for(let inputIdentifier in updatedOrderForm){
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid: formIsValid
    });
    
  }

  render() {
    const formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderClickedHandler}>
        {formElementsArray.map(formElement => (
          <Input key={formElement.id}
            inputtype={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changeHandler={(event) => this.inputChangedHandler(formElement.id ,event)}  
            />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
      </form>
    );

    if(this.props.isLoading){
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data:</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingr: state.burgerBuilder.ingredients,
    totPrice: state.burgerBuilder.totalPrice,
    load: state.burgerBuilder.isLoading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmitOrder: (order) => dispatch(actionCreators.orderSubmit(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(CheckoutData, axios))
