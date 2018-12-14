import * as actionTypes from "../actions/actionTypes";
import {updateObject} from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
}

const  orderStart = (state, action) => {
  return updateObject(state, {loading: true});
}
const orderSucceeded = (state, action) => {
  const newOrder = updateObject(action.orderData, {id: action.order});
    return updateObject(state, {
      loading: false,
      orders: state.orders.concat(newOrder),
      purchased: true
    });
}
export default (state = initialState, action ) => {
  switch (action.type) {
    case actionTypes.ORDER_START: return orderStart(state, action);
    case actionTypes.ORDER_SUCCEEDED: return orderSucceeded(state, action);
    case actionTypes.ORDER_FAILED: return updateObject(state, {loading: false});
    case actionTypes.ORDER_INIT: return updateObject(state, {purchased: false});
    case actionTypes.FETCH_ORDERS_START: return updateObject(state, {loading: true});
    case actionTypes.FETCH_ORDERS_SUCCESS: return updateObject(state, {orders: action.orders, loading: false});
    case actionTypes.FETCH_ORDERS_FAILED: return updateObject(state, {loading: false});
    default: return state
  }
}
