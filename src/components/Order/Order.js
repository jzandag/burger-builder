import React from 'react';

import classes from './Order.module.css'

const Order = (props) => {
    let ingredients = Object.keys(props.ingredients).map((ing,index) => {
        return <span key={index} style={{
                textTransform: 'capitalize',
                border: '2px solid orange',
                padding: '5px',
                borderRadius: '5px',
                color: 'orange',
                backgroudColor: 'white',
                margin: '10px'
                }}>{ing}: {props.ingredients[ing]} </span>
    })

    //ALTERNATIVE
    // let ingredients = []
    // for( let ingName in props.ingredients){
    //     ingredients.push({name: ingName, amount:  props.ingredients[ingName]})
    // }
    return (
        <div className={classes.Order}>
            <p>Ingredients:  </p>
            {ingredients}
            <p>Price: <strong>PHP {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
}

export default Order;
