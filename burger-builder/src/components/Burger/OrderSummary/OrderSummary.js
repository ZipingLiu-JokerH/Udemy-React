import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    // this  could be a functional component, doesn't have to be a classed based one.
    componentWillUpdate(){
        console.log('[Order Summary] willUpdate');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients).map(
            igkey => {
                return (
                    <li key={igkey+'fckkey'}>
                        <span style={{textTransform:"capitalize"}}>{igkey}</span>: {this.props.ingredients[igkey]}
                    </li>
                );
            }
        );

        return(
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Cost: {this.props.total.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button clicked={this.props.purchaseCancele} btnType="Danger">CANCLE</Button>
                <Button clicked={this.props.purchaseContinue} btnType="Success">CONTINUE</Button>
            </Aux>
        );
    }

};

export default OrderSummary;