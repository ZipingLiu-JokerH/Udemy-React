import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Checkout = props => {

    const checkoutCancelHandler = () => {
        props.history.goBack();
    };

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    };


    let summary = <Redirect to='/' />
    if (props.ings) {
        const purchaseRedirect = props.purchased ? <Redirect to='/' /> : null;
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCancel={checkoutCancelHandler}
                    checkoutContinue={checkoutContinueHandler} />
                <Route path={props.match.path + '/contact-data'} component={ContactData} />
            </div>
        );
    };
    return summary;

};

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
};

export default connect(mapStateToProps)(Checkout);