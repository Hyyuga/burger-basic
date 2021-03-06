import React from "react";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                        <span style={{textTransform: "capitalize"}}>{igKey}</span>: {props.ingredients[igKey]}
                    </li>
        });

    // <li>Salad: 1</li>
    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Sum: <strong>{props.totalPrice.toFixed(2)} $</strong></p>
            <p>Continue to checkout.</p>
            <Button 
                clicked={props.purchaseCanceled} 
                btnType="Success">CANCEL</Button>
            <Button 
                clicked={props.purchaseContinued} 
                btnType="Danger">CONTINUE</Button>
        </>
    )    
}

export default orderSummary;