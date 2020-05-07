import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';


class OrderSummary extends Component {
    componentDidUpdate(){
        
    }
    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(u => {
            return (
                <li key={u}>{u.charAt(0).toUpperCase() + u.slice(1)}: {this.props.ingredients[u]}</li>
            )
        })
        return (
            <Aux>
                <h3>Your order: </h3>
                <p>A delicious with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total price: ₱{this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button buttonType="Danger" clicked={this.props.cancel}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.confirm}>ORDER</Button>
            </Aux>
        );
    }
}

export default OrderSummary;
