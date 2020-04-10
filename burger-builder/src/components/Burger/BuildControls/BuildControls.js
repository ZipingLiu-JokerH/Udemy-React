import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import cssStyle from './BuildControls.module.css';

const controls = [
    {label: 'Salad', type:'salad'},
    {label: 'Bacon', type:'bacon'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Meat', type:'meat'},
];

const buildControls = (props) => (
    <div className={cssStyle.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} 
            label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={() => props.ingredientRemoved(ctrl.type)}
            disable={props.disableInfo[ctrl.type]} />)
        )}
        <button className={cssStyle.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>ORDER NOW</button>
    </div>
)

export default buildControls;