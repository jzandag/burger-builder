import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom'
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    
    }

    componentWillMount(){
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = null
        for( let i of query.entries()){
            if(i[0] === 'price'){
                price= i[1]
                continue;
            }
            ingredients[i[0]] = +i[1]
        }

        this.setState({ingredients, price})
    }

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
                    ingredients={this.state.ingredients}/>
                {/* To pass props to companent in routes */}
                {/* <Route path={this.props.match.url + '/contact-data' } component={ContactData}/> */}
                <Route path={this.props.match.url + '/contact-data' } render={(props)=> <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props}/>}/>
            </div>
        );
    }
}

export default Checkout;
