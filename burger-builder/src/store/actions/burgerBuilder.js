import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

export const addIngredient = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ...payload
    };
};

export const removeIngredient = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ...payload
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

const setIngredients = (payload) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ...payload
    };
}

export const initIngredientsAsync = () => {
    return dispatch => {
        axios.get('/ingredients.json')
             .then(response => {
                 dispatch(setIngredients({ingredients: response.data}))
             })
             .catch(error => {
                 dispatch(fetchIngredientsFailed());
             });
    }
}