import React from 'react';
import navigationItems from '../NavigationItems/NavigationItems';
import cssStyle from './NavigationItem.module.css';

const navigationItem = (props) => (
    <li className={cssStyle.NavigationItem}>
        <a 
        href={props.link}
        className={props.active? cssStyle.active:null}
        >
            {props.children}
        </a>
    </li>
);

export default navigationItem;