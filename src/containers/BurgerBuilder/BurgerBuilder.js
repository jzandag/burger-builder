import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';
const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 10,
    meat: 50,
    bacon: 25
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 30,
        purchaseable: false,
        purchasing: false, 
        loading: false,
        error: false
    }

    updatePurchaseState(ingredients){
        // const ingredients = {
        //     ...this.state.ingredients
        // }

        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key]
        }).reduce((prev, curr) => {
            return prev + curr
        }, 0)

        this.setState({purchaseable: sum > 0})
    }

    addingIngredient = (type) => {
        const oldCount = this.state.ingredients[type] + 1
        const updatedIngredients = {...this.state.ingredients}
        updatedIngredients[type] = oldCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients)
        
    }

    removeIngredient = (type) => {
        if(this.state.ingredients[type] !== 0){
            const oldCount = this.state.ingredients[type] - 1
            const updatedIngredients = {...this.state.ingredients}
            updatedIngredients[type] = oldCount

            const priceDeletion = INGREDIENT_PRICES[type]
            const oldPrice = this.state.totalPrice
            const newPrice = oldPrice - priceDeletion

            this.setState({ 
                ingredients: updatedIngredients,
                totalPrice: newPrice    
            })
            this.updatePurchaseState(updatedIngredients)
        }
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        })
    }

    hideHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        
        const queryParams = []
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price='+this.state.totalPrice)
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString
            
        })
    }

    componentDidMount(){
        axios.get('https://react-my-burger-3ec14.firebaseio.com/ingredients.json').then((result) => {
            this.setState({ingredients: result.data})
        }).catch((err) => {
            this.setState({error: true})
        });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (const key in disabledInfo) {
            disabledInfo[key] =  disabledInfo[key] <= 0
        }
        let orderSumamry = null
        
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Ingredients cant be loaded</p> : <Spinner />
        if(this.state.ingredients){
            burger = <Aux>
                    <Burger ingredients={this.state.ingredients}  />
                        <BuildControls 
                            more={this.addingIngredient}
                            less={this.removeIngredient}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchaseable={this.state.purchaseable}
                            purchase={this.purchaseHandler}
                        />
                </Aux>
            orderSumamry = <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients} 
            cancel={this.hideHandler} 
            confirm={this.purchaseContinueHandler}/>
        }
        if(this.state.loading)
            orderSumamry = <Spinner />
        return (
            <Aux>
                <Modal show={this.state.purchasing} click={this.hideHandler}>
                    {orderSumamry}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler( BurgerBuilder, axios);
