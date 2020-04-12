import React from 'react';
import cssStyle from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavagationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={cssStyle.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked}/>
        <div className={cssStyle.Logo}>
                <Logo />
        </div>
        <nav className={cssStyle.DesktopOnly}>
            <NavagationItems />
        </nav>
    </header>
);

export default toolbar;