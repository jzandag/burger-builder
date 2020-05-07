import React, { Component } from 'react';
import './App.css';

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
            <Switch>
                <Route path="/checkout" component={Checkout} />
                <Route path="/orders" exact component={Orders} />
                <Route path="/" exact component={BurgerBuilder} />
            </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
