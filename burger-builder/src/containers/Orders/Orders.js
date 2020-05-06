import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { fetchOrderAsync } from '../../store/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.authToken, this.props.userId);
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = (
                <div>
                    {this.props.orders.map(order => {
                        return <Order key={order.id} ingredients={order.ingredients} price={parseFloat(order.price)} />
                    })}
                </div>
            );
        }
        return orders;
    };
};

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        authToken: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchTpProps = dispatch => {
    return {
        onFetchOrders: (authToken, userId) => dispatch(fetchOrderAsync(authToken, userId))
    }
};


export default connect(mapStateToProps, mapDispatchTpProps)(withErrorHandler(Orders, axios));