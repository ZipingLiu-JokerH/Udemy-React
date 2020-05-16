import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/index';



const BurgerBuilder = props => {

    // have the user click checkout
    const [purchasing, setPurchasing] = useState(false);

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient({ ingredientName: ingName }));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient({ ingredientName: ingName }));
    const onInitIngredients = useCallback(() => dispatch(actions.initIngredientsAsync()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => { onInitIngredients() }, [onInitIngredients])


    // To test whether or not we have adding something in the burger
    const updatePurchase = (ingredients) => {
        let sum = 0;
        for (let ing in ingredients) {
            sum += ingredients[ing]
        }
        return sum > 0;
    };

    // when ever we click the checkout button, we call this handler
    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        }
    };

    // when we already clicked the Order now and want to cancle the order, user clicked on the backdrop
    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    };

    const disableInfo = { ...ings };
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] < 1;
    };

    let orderSummary = null;
    let burger = error ? <p>Ingredients cant be load!</p> : <Spinner />;
    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disableInfo={disableInfo}
                    purchaseable={updatePurchase(ings)}
                    isAuthenticated={isAuthenticated}
                    price={price}
                    ordered={purchaseHandler} />
            </Aux>);
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                total={price}
                purchaseCancele={purchaseCancelHandler}
                purchaseContinue={purchaseContinueHandler} />);
    };

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};


export default (withErrorHandler(BurgerBuilder, axios));