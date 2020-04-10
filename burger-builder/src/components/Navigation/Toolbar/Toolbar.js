import React from 'react';
import cssStyle from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavagationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={cssStyle.Toolbar}>
        <div>MENU</div>
        <Logo height='80%'/>
        <nav>
            <NavagationItems />
        </nav>
    </header>
);

export default toolbar;