import React from 'react';

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckOutSummary}>
            <h1>I hope it taste well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button buttonType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button buttonType="Success" clicked={props.continue}>CONFIRM</Button>
        </div>
    );
}

export default CheckoutSummary;
