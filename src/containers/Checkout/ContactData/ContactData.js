import React, { Component } from 'react'
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner"
import  axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";

export class CheckoutData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: ""
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: ""
      },
      zipCode:  {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Postal Code"
        },
        value: ""
      },
      country:  {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: ""
      },
      email:  {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: ""
      },
      deliveryMethod:  {
        elementType: "select",
        elementConfig: {
          options: [{value: "fastest", displayValue: "Fastest"},
                    {value: "cheapest", displayValue: "Cheapest"}]
        },
        value: ""
      },
    },
    loading: false
  }

  orderClickedHandler = (event)  => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
     
    }
    axios.post("/orders.json", order)
      .then(response => {
        this.setState({loading: false});
        console.log(this.props);
        this.props.history.push("/burger-builder");
      })
      .catch(error => this.setState({loading: false}));
  }
  
  inputChangedHandler = (inputIdentifier, event)=> {
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    } 
    updatedFormElement.value = event.target.value;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    this.setState({
      orderForm: updatedOrderForm
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
      <form>
        {formElementsArray.map(formElement => (
          <Input key={formElement.id}
            inputtype={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            changeHandler={(event) => this.inputChangedHandler(formElement.id ,event)}  
            />
        ))}
        <Button btnType="Success" clicked={this.orderClickedHandler}>ORDER</Button>
      </form>
    );

    if(this.state.loading){
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

export default CheckoutData
