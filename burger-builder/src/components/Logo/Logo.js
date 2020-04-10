import React from 'react';
import burgerLogo from '../../assets/images/logo.png';
import cssStyle from './Logo.module.css';

const logo = (props) => (
    <div className={cssStyle.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt='BurgerLogo' />
    </div>
);

export default logo;