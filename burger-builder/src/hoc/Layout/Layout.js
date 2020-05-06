import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import cssStyle from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

import {connect} from 'react-redux';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} isAuthenticated={this.props.isAuthenticated}/>
                <SideDrawer close={this.sideDrawerClosedHandler} showSideDrawer={this.state.showSideDrawer}/>
                <main className={cssStyle.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    };
};

const mapStateToPorps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToPorps)(Layout);