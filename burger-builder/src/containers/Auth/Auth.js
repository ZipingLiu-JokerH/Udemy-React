import React, { useState, useEffect } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import { checkValidity } from '../../shared/utility';

import cssStyle from './Auth.module.css';



const Auth = props => {

    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });

    const [isSignUp, setIsSignUp] = useState(true);


    const inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...controls
        };

        const updatedFormElement = {
            ...updatedControls[controlName]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedControls[controlName] = updatedFormElement;

        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        props.onAuth(controls.email.value, controls.password.value, isSignUp);
    };

    const switchAuthModeHandler = () => {
        setIsSignUp(prevState => {
            return !prevState;
        });
    };

    const {buildingBurger, authRedirectPath, onSetAuthRedirectPath} = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        };
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);


    const formElementsArray = [];
    for (let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key],
        });
    }

    let form = formElementsArray.map(formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)} />)
    );

    if (props.loading) {
        form = <Spinner />
    }

    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    };

    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />;
    };

    return (
        <div className={cssStyle.Auth}>
            {authRedirect}
            {isSignUp ? `SIGNUP` : 'SIGNIN'}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType='Success'>Submit</Button>
            </form>
            <Button btnType='Danger' clicked={switchAuthModeHandler}>
                SWITCH TO {isSignUp ? `SIGNIN` : 'SIGNUP'}
            </Button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.authAsync({ email: email, password: password, isSignUp: isSignUp })),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);