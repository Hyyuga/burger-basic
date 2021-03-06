import React, { Component } from 'react'
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from "react-redux"
import * as actions from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner";

export class Orders extends Component {
    componentDidMount () {
        // axios.get("/orders.json")
        //     .then(res => {
        //         console.log(res);
                
        //         const fetchedOrders= [];
        //         for(let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({orders: fetchedOrders, loading: false});
        //     })
        //     .catch(error => {
        //         console.log(error);
                
        //         this.setState({loading: false});
        //     });
        this.props.onFetchOrders();
    }

  render() {
      let orders = <Spinner />;
      if (!this.props.loading) {
          orders = (
            this.props.orders.map(order => (
            <Order 
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
            />
        ))
        );
      }
    return (
      <div>
       {orders}
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
