import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import cssStyle from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={cssStyle.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        {props.isAuthenticated? <NavigationItem link='/orders'>My Orders</NavigationItem>: null}
        {props.isAuthenticated ? <NavigationItem link='/logout'>Logout</NavigationItem> :
            <NavigationItem link='/auth'>Authenticate</NavigationItem>}
    </ul>
);

export default navigationItems;