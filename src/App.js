import React, { Component } from 'react';
import './App.css';

import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import {BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionTypes from './store/actions/index'

import asyncComponent from './hoc/asyncComponent'

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders')
})
const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth')
})

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoSignUp()
    }
    
  render() {
      let routes = (
          <Switch>
            <Route path="/auth" exact component={asyncAuth} />
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect to='/'/> 
          </Switch>
      )
      
      if(this.props.isAuthenticated){
          routes = (
              <Switch>
                <Route path="/checkout" component={asyncCheckout} />
                <Route path="/orders" exact component={asyncOrders} />
                <Route path="/logout" exact component={Logout} />
                <Route path="/auth" exact component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )
      }
    return (
      <BrowserRouter>
        <Layout>
            {routes }
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: () => dispatch(actionTypes.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
