import React from 'react';
import cssStyle from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_, index) => {
                return <BurgerIngredient type = {igkey} key = {igkey+index} />
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (transformedIngredients.length === 0){
        transformedIngredients = <p> Please start adding ingredients</p>;
    }

    return(
        <div className={cssStyle.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}
export default burger;