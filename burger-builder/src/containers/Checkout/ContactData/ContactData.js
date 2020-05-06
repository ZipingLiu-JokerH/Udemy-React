import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import cssStyle from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {purchaseBurgerAsync} from '../../../store/actions/index';

import { connect } from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street Name'
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required:true,
                    minLength: 6,
                    maxLength: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required:true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required:true,
                    isEmail:true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'fastest' },
                        { value: 'cheapest', displayValue: 'cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        // true when the spinner should show up. (the spinner when user finish the form and click ORDER NOW)
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value;
        };
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.authToken);
    }

    checkValidity(value, rules){
        let isValid = true;

        if (!rules){
            return true;
        }

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if (rules.maxLength){
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let updateFormValid = true;
        for(let formElement in updatedOrderForm){
            updateFormValid = updateFormValid && updatedOrderForm[formElement].valid;
        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: updateFormValid });
    }


    render() {

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />)
                )}
                <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER NOW</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }

        return (
            <div className={cssStyle.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        authToken: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return{
        onOrderBurger: (orderData, authToken) => dispatch(purchaseBurgerAsync(orderData,authToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));