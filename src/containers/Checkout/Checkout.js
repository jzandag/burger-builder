import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';

import { connect } from "react-redux";

class Checkout extends Component {
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
        return (
            <div>
                <CheckoutSummary 
                    cancelled={this.cancelledHandler}
                    continue={this.continueHandler}
                    ingredients={this.props.ings}/>
                {/* To pass props to companent in routes */}
                {/* <Route path={this.props.match.url + '/contact-data' } component={ContactData}/> */}
                <Route path={this.props.match.url + '/contact-data' } component={ContactData}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
