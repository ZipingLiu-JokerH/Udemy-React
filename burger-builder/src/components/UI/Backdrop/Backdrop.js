import React from 'react';
import cssStyle from './Backdrop.module.css';

const backdrop = (props) => (
    props.show? <div className={cssStyle.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;