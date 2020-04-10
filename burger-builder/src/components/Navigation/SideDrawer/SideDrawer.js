import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import cssStyle from './SideDrawer.module.css';

const sideDrawer = (props) => {

    return(
        <div className={cssStyle.SideDrawer}>
            <div className={cssStyle.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};

export default sideDrawer;