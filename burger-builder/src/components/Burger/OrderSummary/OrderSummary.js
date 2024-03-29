import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
    // this  could be a functional component, doesn't have to be a classed based one.

    const ingredientSummary = Object.keys(props.ingredients).map(
        igkey => {
            return (
                <li key={igkey + 'fckkey'}>
                    <span style={{ textTransform: "capitalize" }}>{igkey}</span>: {props.ingredients[igkey]}
                </li>
            );
        }
    );

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Cost: {props.total.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.purchaseCancele} btnType="Danger">CANCLE</Button>
            <Button clicked={props.purchaseContinue} btnType="Success">CONTINUE</Button>
        </Aux>
    );

};

export default OrderSummary;