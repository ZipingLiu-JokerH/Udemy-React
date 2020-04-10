import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssStyle from './SideDrawer.module.css';

const sideDrawer = (props) => {

    return(
        <div className={cssStyle.SideDrawer}>
            <Logo height='11%'/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;