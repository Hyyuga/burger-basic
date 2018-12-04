import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (payload) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient: payload
})
export const removeIngredient = (payload) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient: payload
})


const setIngredients = (payload) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: payload
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("https://react-my-burger-ebf93.firebaseio.com/ingredients.json")
        .then(response => {
            dispatch(setIngredients(response.data));
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed());
        });
    }
}