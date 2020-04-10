import React from 'react';
import cssStyle from './Toolbar.module.css';

const toolbar = (props) => (
    <header className={cssStyle.Toolbar}>
        <div>MENU</div>
        <div>LOGO</div>
        <nav>
            ...
        </nav>
    </header>
);

export default toolbar;