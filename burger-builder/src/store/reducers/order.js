import * as actionTypes from '../actions/actionTypes';

const initState = {
    orders: [],
    loading: false,
    purchased: false,
    error: null
};

const reducer = (state=initState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return{
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.data,
                id: action.id
            };
            return{
              ...state,
              loading: false,
              purchased: true,
              orders: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.PURCHASE_BURGER_START:
            return{
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return{
                ...state,
                loading: false,
                orders: action.orders
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return{
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.FETCH_ORDERS_START:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
};

export default reducer;