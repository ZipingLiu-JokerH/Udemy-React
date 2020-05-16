import React, { useState } from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import cssStyle from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import { connect } from 'react-redux';

const Layout = props => {

    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(previousState => {
            return !previousState;
        })
    };

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerToggleHandler} isAuthenticated={props.isAuthenticated} />
            <SideDrawer close={sideDrawerClosedHandler} showSideDrawer={sideDrawerIsVisible} isAuthenticated={props.isAuthenticated} />
            <main className={cssStyle.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

const mapStateToPorps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToPorps)(Layout);