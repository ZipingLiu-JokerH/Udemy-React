import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import cssStyle from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={cssStyle.NavigationItems}>
        <NavigationItem link='/' active={true}>Burger Builder</NavigationItem>
        <NavigationItem link='/' active={false}>Check Out</NavigationItem>
    </ul>
);

export default navigationItems;