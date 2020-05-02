import * as actionTypes from './actionsTypes';

export const storeResult = (payload) => {
    return {
        type: actionTypes.STORE_RESULT,
        ...payload
    };
};
export const deleteResult = (payload) => {
    return {
        type: actionTypes.DELETE_RESULT,
        ...payload
    };
};

export const storeResultAsync = (payload) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(storeResult(payload));
        }, 2000);
    };
};
