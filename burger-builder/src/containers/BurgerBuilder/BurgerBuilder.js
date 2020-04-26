import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:1,
    cheese:0.7,
    meat:1.5
};

class BurgerBuilder extends Component{

    state = {
        ingredients:null,
        totalPrice:4,
        // have the user add item to burger
        purchaseable:false,
        // have the user click checkout
        purchasing:false,
        // if we have error when get ingredients from server.
        error: false
    };

    componentDidMount(){
        axios.get('https://react-burgerbuilder-77cc6.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error:true});
            });
    };

    // when ever we add or remove ingredients, we call this handler
    updatePurchase = (ingredients) =>{
        let sum = 0;
        for(let ing in ingredients){
            sum += ingredients[ing]
        }
        this.setState({purchaseable: sum > 0});
    };

    // when ever we click the checkout button, we call this handler
    purchaseHandler = () => {
        this.setState({purchasing:true});
    };

    // when we already clicked the Order now and want to cancle the order, user clicked on the backdrop
    purchaseCancelHandler = () => {
        this.setState({purchasing:false});
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };

    addIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newIngredients[type] + 1;
        const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({totalPrice:newTotalPrice, ingredients:newIngredients});
        this.updatePurchase(newIngredients);
    };

    removeIngredientHandler = (type) => {
        const newIngredients = {...this.state.ingredients};
        newIngredients[type] = newIngredients[type] - 1;
        const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({totalPrice:newTotalPrice, ingredients:newIngredients});
        this.updatePurchase(newIngredients);
    };

    render() {

        const disableInfo = {...this.state.ingredients};
        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] < 1;
        };

        let orderSummary = null;
        let burger = this.state.error?  <p>Ingredients cant be load!</p> : <Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disableInfo={disableInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice} 
                    ordered={this.purchaseHandler}/>
                 </Aux>);
            orderSummary = (
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    total={this.state.totalPrice}
                    purchaseCancele={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>);
        };
        if(this.state.loading){
            orderSummary = <Spinner />;
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

export default withErrorHandler(BurgerBuilder, axios);