import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'

import { connect } from 'react-redux'
import * as burgerBuilderActions from '../../store/actions/index'

import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler';

class BurgerBuilder extends Component {
    state = {
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

       return sum > 0
    }

    // addingIngredient = (type) => {
    //     const oldCount = this.state.ingredients[type] + 1
    //     const updatedIngredients = {...this.state.ingredients}
    //     updatedIngredients[type] = oldCount
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
        
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: newPrice
    //     })
    //     this.updatePurchaseState(updatedIngredients)
        
    // }

    // removeIngredient = (type) => {
    //     if(this.state.ingredients[type] !== 0){
    //         const oldCount = this.state.ingredients[type] - 1
    //         const updatedIngredients = {...this.state.ingredients}
    //         updatedIngredients[type] = oldCount

    //         const priceDeletion = INGREDIENT_PRICES[type]
    //         const oldPrice = this.state.totalPrice
    //         const newPrice = oldPrice - priceDeletion

    //         this.setState({ 
    //             ingredients: updatedIngredients,
    //             totalPrice: newPrice    
    //         })
    //         this.updatePurchaseState(updatedIngredients)
    //     }
    // }

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
        //CHANGED WITH REDUX
        // const queryParams = []
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+this.state.totalPrice)
        // const queryString = queryParams.join('&')
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?'+ queryString
        // })

        this.props.history.push('/checkout')
        this.props.onInitPurchase()
    }

    componentDidMount(){
        this.props.onInitIngredients()
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        }
        for (const key in disabledInfo) {
            disabledInfo[key] =  disabledInfo[key] <= 0
        }
        let orderSumamry = null
        
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Ingredients cant be loaded</p> : <Spinner />
        if(this.props.ings){
            burger = <Aux>
                    <Burger ingredients={this.props.ings}  />
                        <BuildControls 
                            more={this.props.onIngredientAdded}
                            less={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.totalPrice}
                            purchaseable={this.updatePurchaseState(this.props.ings)}
                            purchase={this.purchaseHandler}
                        />
                </Aux>
            orderSumamry = <OrderSummary 
                price={this.props.totalPrice}
                ingredients={this.props.ings} 
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}   

const mapDispatchToProps = dispatch => {
    return {
         onIngredientAdded: (ing) => dispatch(burgerBuilderActions.addIngredient(ing)),
         onIngredientRemoved: (ing) => dispatch(burgerBuilderActions.removeIngredient(ing)),
         onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
         onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios));
