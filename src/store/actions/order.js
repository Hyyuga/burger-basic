import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const orderSucceeded = (id, orderData) => ({
  type: actionTypes.ORDER_SUCCEEDED,
  order: id,
  orderData: orderData
})

export const orderFailed = (error) => ({
  type: actionTypes.ORDER_FAILED,
  error: error
})

export const orderStart = () => {
    return {
        type: actionTypes.ORDER_START
    }
}

export const orderSubmit = (order) => {
    console.log(order);
    return dispatch => {
        dispatch(orderStart());
        axios.post("/orders.json", order)
        .then(response => {
            console.log(response.data);
            dispatch(orderSucceeded(response.data.name, order))
        })
        .catch(error => {
            console.log(error);
            dispatch(orderFailed(error))
        });
    }
}

export const orderInit = () => {
    return{
        type: actionTypes.ORDER_INIT
    }
}

export const fetchOrders = () => {
      return dispatch => {
          dispatch(fetchOrderStart());
        axios.get("/orders.json")
        .then(res => {
            const fetchedOrders= [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
            dispatch(fetchOrderSuccess(fetchedOrders));
        })
        .catch(error => {
            dispatch(fetchOrderFailed(error));
        });
      }
  
}


export const fetchOrderStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
})
export const fetchOrderSuccess = (orders) => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  orders: orders
})
export const fetchOrderFailed = (error) => ({
  type: actionTypes.FETCH_ORDERS_FAILED,
  error: error
})
