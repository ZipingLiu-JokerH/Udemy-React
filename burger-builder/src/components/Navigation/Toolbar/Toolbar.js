import React from 'react';
import cssStyle from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavagationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={cssStyle.Toolbar}>
        <div>MENU</div>
        <div className={cssStyle.Logo}>
                <Logo />
        </div>
        <nav>
            <NavagationItems />
        </nav>
    </header>
);

export default toolbar;