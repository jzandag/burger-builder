import * as actionTypes from '../actions/actionTypes'
import { updateObject } from "../utility";

const INGREDIENT_PRICES = {
    salad: 5,
    cheese: 10,
    meat: 50,
    bacon: 25
}

const initState = {
    ingredients: null,
    totalPrice: 30,
    error: false,
}

const addIngredient = (state, action) => {
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1} 
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state,updatedState)
}

const removeIngredient = (state, action) => {
    const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1} 
    const updatedIngs = updateObject(state.ingredients, updatedIng)
    const updatedStates = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }
    return updateObject(state,updatedStates)
}

const setIngredient = (state, action) => {
    const newState ={
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            meat: action.ingredients.meat,
            cheese: action.ingredients.cheese
        },
        totalPrice: 30,
        error: false
    }
    return updateObject(state,newState)
} 

const reducer = (state = initState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS:
            return setIngredient(state, action)
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
        default:
    }
    return state
}

export default reducer