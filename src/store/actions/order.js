import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const placeOrder = (payload) => ({
  type: actionTypes.PLACE_ORDER,
  order: payload
})


export const submitOrder = (dispatch) => {
    return dispatch => {
        axios.post("/orders.json", order)
        .then(response => {
            dispatch(placeOrder())
        })
        .catch(error => {

        });
    }
}