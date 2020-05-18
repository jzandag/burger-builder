import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';

import axios from '../../../axios-orders'
import classes from './ContactData.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler'

import * as actionTypes from '../../../store/actions/index'
import { connect } from "react-redux";

class ContactData extends Component {
    state = {
        order: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code..'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5
                },
                valid: false,
                touch: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touch: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                },
                value: 'fastest',
                valid: false,
                touch: false
            }
        },
        formValid: false,
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if(!rules)
            return true
        if(rules.required){
            isValid = value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid
        }

        return isValid
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const formData = {
             ...this.state.order
        }
        const formElement = {...formData[inputIdentifier]}
        formElement.value = event.target.value
        formElement.touch = true
        formElement.valid = this.checkValidity(formElement.value, formElement.validation)
        formData[inputIdentifier] = formElement

        let formisValid = true
        for (let inputIdentifier in formData){
            formisValid = formData[inputIdentifier].valid && formisValid
        }

        this.setState({order: formData, formValid: formisValid})
    }

    orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        for (let formElement in this.state.order ){
            formData[formElement] = this.state.order[formElement].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData
        }
        console.log(order);
        this.props.onOrderBurger(order)
    }

    render() {
        const formElements = []
        for(let key in this.state.order){
            formElements.push({
                id: key,
                config: this.state.order[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(el => {
                    return <Input 
                                key={el.id}
                                elementType={el.config.elementType}
                                elementConfig={el.config.elementConfig}
                                value={el.config.value}
                                change={(event) => this.inputChangeHandler(event, el.id)}
                                validation={el.validation}
                                valid={el.config.valid}
                                touch={el.config.touch}
                            />
                })}
                <Button buttonType="Success" disabled={!this.state.formValid}>ORDER</Button>
        </form>)
        if(this.props.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch =>  {
    return {
        onOrderBurger: (orderData) => dispatch(actionTypes.purchaseBurger(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
