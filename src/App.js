import React, { Component } from 'react';
import Layout from "./components/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import {Route, Redirect, Switch} from "react-router-dom"
import Checkout from './containers/Checkout/Checkout';
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <Switch>
          <Route path="/burger-builder" component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Redirect from="/" to ="/burger-builder"/>
          <Route render={() => <h1>NOT FOUND</h1>}/>
        </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
