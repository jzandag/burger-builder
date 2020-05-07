import React from 'react';

import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    let transformedIngredient = Object.keys(props.ingredients).map(e => {
        return [...Array(props.ingredients[e])].map((i, index) => {
            return <BurgerIngredient key={e + index} type={e}/>
        })
    }).reduce((prev,curr) =>  {
        return prev.concat(curr)
    }, [])

    if(transformedIngredient.length === 0)
        transformedIngredient = <p>Please put ingredients first</p>

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;
