import React from 'react';
import cssStyle from './BuildControl.module.css';

const buildControl = (props) => (
    <div className={cssStyle.BuildControl}>
        <div className={cssStyle.Label}>{props.label}</div>
        <button className={cssStyle.Less} onClick={props.removed} disabled={props.disable}>Less</button>
        <button className={cssStyle.More} onClick={props.added}>More</button>
    </div>
);

export default buildControl;