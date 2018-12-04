import * as actionTypes from "./actionTypes";

export const addIngredient = (payload) => ({
  type: actionTypes.ADD_INGREDIENT,
  ingredient: payload
})
export const removeIngredient = (payload) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  ingredient: payload
})
