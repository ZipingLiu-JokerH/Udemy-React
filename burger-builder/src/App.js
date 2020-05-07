import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import asyncComponent from './hoc/asyncComponent/asyncComponent'
import * as actions from './store/actions/index';


const AsyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const AsyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});
const AsyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  };

  render() {

    let routes = (
      <Switch>
        <Route path='/auth' component={AsyncAuth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={AsyncCheckout} />
          <Route path='/orders' component={AsyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={AsyncAuth} />
          <Route path='/' component={BurgerBuilder} />
          <Redirect to='/' />
        </Switch>
      );
    };

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
