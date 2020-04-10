import React from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import cssStyle from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = (props) => (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className={cssStyle.Content}>
            {props.children}
        </main>
    </Aux>
);

export default layout;