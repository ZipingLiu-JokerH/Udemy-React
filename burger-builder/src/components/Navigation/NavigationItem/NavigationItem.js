import React from 'react';
import cssStyle from './NavigationItem.module.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => (
    <li className={cssStyle.NavigationItem}>
        <NavLink 
            to={props.link}
            exact = {props.exact}
            activeClassName={cssStyle.active}
        >
            {props.children}
        </NavLink>
    </li>
);

export default navigationItem;