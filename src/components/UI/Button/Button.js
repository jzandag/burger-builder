import React from 'react';
import Aux from '../../../hoc/Auxiliary';

import classes from './Button.module.css'

const Button = (props) => {
    return (
        <Aux>
            <button
                disabled={props.disabled}
                className={[classes.Button, classes[props.buttonType]].join(' ')}
                onClick={props.clicked}>
                {props.children}</button>
        </Aux>
    );
}

export default Button;
