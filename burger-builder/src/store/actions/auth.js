import * as actionTypes from './actionTypes';
import axios from 'axios';

const API_KEY = 'AIzaSyBBl3xCO0eOAyqLaxbbHO4Jmum2aYhDWSw';

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

const authSuccess = (payload) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        ...payload
    };
};

const authFail = (payload) => {
    return {
        type: actionTypes.AUTH_FAIL,
        ...payload
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};



const checkAuthTimeoutAsync = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const authAsync = (payload) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: payload.email,
            password: payload.password,
            returnSecureToken: true
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        if (!payload.isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        }
        axios.post(url, authData)
            .then(response => {
                const payload = { token: response.data.idToken, userId: response.data.localId };

                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);


                dispatch(authSuccess(payload));
                dispatch(checkAuthTimeoutAsync(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail({ error: error.response.data.error }));
            })
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            if (expirationDate > new Date()) {
                const userId = localStorage.getItem('userId');
                const payload = { token: token, userId: userId };
                dispatch(authSuccess(payload));
                dispatch(checkAuthTimeoutAsync((expirationDate.getTime() - new Date().getTime()) / 1000));
            } else {
                dispatch(logout());
            }
        }
    }
}