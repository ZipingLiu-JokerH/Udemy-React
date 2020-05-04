import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const purchaseBurgerSuccess = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        ...payload
    };
}

const purchaseBurgerFail = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        ...payload
    };
}

const purchaseBurgerStart = () => {
    return{
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurgerAsync = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess({id:response.data.name, data:orderData}))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail({error:error}))
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

const fetchOrdersSuccess = (payload) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        ...payload
    };
};

const fetchOrdersFail = (payload) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        ...payload
    };
};

const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
  };
};

export const fetchOrderAsync = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('./orders.json')
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data){
                fetchedOrders.push({...res.data[key], id:key});
            };
            dispatch(fetchOrdersSuccess({orders: fetchedOrders}));
        })
        .catch(error => {
            dispatch(fetchOrdersFail({error:error}));
        })
    };
};
