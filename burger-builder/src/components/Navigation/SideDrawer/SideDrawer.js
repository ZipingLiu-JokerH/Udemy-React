import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';
import cssStyle from './SideDrawer.module.css';

const sideDrawer = (props) => {

    //determine whether or not to show the side drawer
    const attachedClasses = [cssStyle.SideDrawer, cssStyle.Close];
    if (props.showSideDrawer){
        attachedClasses[1] = cssStyle.Open;
    }


    return(
        <Aux>
            <div className={cssStyle.Backdrop}>
                <Backdrop clicked={props.close} show={props.showSideDrawer} />
            </div>
            <div className={attachedClasses.join(' ')}>
                <div className={cssStyle.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
       
    );
};

export default sideDrawer;