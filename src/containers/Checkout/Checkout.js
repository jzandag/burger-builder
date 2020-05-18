import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import withErrorHandler from '../../hoc/withErrorHandler'
import axios from "../../axios-orders";

import * as actionTypes from '../../store/actions/index'
import { connect } from "react-redux";

class Checkout extends Component {

    componentWillMount(){
        this.props.onInitPurchase()
    }
    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = null
    //     for( let i of query.entries()){
    //         if(i[0] === 'price'){
    //             price= i[1]
    //             continue;
    //         }
    //         ingredients[i[0]] = +i[1]
    //     }

    //     this.setState({ingredients, price})
    // }

    cancelledHandler = () => {
        this.props.history.goBack()
    }

    continueHandler = () => {
        console.log(this.props.match.url + '/contact-data')
        this.props.history.replace('/checkout/contact-data')
    }
    render() {
        let summary = <Redirect to="/" />
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary =  
                <div>
                {purchasedRedirect}
                <CheckoutSummary 
                    cancelled={this.cancelledHandler}
                    continue={this.continueHandler}
                    ingredients={this.props.ings}/>
                <Route path={this.props.match.url + '/contact-data' } component={ContactData}/>
                </div>
        } 
        return (
            <div>
                {summary}
                {/* To pass props to companent in routes */}
                {/* <Route path={this.props.match.url + '/contact-data' } component={ContactData}/> */}
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actionTypes.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Checkout, axios));
