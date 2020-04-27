import React from 'react';
import cssStyle from './Button.module.css';

const button = (props) => (
    <button
    onClick={props.clicked}
    disabled={props.disabled}
    className={[cssStyle.Button, cssStyle[props.btnType]].join(' ')}
    >
        {props.children}
    </button>
);

export default button;