import React from 'react';

import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const BuildControls = (props) => {
    const controls = [
        { label: 'Salad', type: 'salad'},
        { label: 'Bacon', type: 'bacon'},
        { label: 'Meat', type: 'meat'},
        { label: 'Cheese', type: 'cheese'},
    ]
    return (
        <div className={classes.BuildControls}>
            <p>Curent Price: PHP<strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(u => {
                return (
                    <BuildControl key={u.label} 
                        label={u.label} 
                        more={() => props.more(u.type)} 
                        less={() => props.less(u.type)}  
                        disabled={props.disabled[u.type]}
                    />
                )
            })}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchaseable}
                onClick={props.purchase}
                >{props.isAuth ? 'ORDER NOW': 'SIGN IN TO ORDER'}</button>
        </div>
    );
}

export default BuildControls;
