import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {

    state = {
        // have the user click checkout
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    };

    // To test whether or not we have adding something in the burger
    updatePurchase = (ingredients) => {
        let sum = 0;
        for (let ing in ingredients) {
            sum += ingredients[ing]
        }
        return sum > 0;
    };

    // when ever we click the checkout button, we call this handler
    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    // when we already clicked the Order now and want to cancle the order, user clicked on the backdrop
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {

        const disableInfo = { ...this.props.ings };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] < 1;
        };

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients cant be load!</p> : <Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disableInfo={disableInfo}
                        purchaseable={this.updatePurchase(this.props.ings)}
                        price={this.props.price}
                        ordered={this.purchaseHandler} />
                </Aux>);
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    total={this.props.price}
                    purchaseCancele={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler} />);
        };

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
};



const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient({ ingredientName: ingName })),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient({ ingredientName: ingName })),
        onInitIngredients: () => dispatch(actions.initIngredientsAsync()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));