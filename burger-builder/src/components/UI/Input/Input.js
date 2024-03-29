import React from 'react';
import cssStyle from './Input.module.css';

const input = (props) => {

    let inputElement = null;
    const inputCssClass = [cssStyle.InputElement];

    if (props.invalid && props.shouldValidate && props.touched){
        inputCssClass.push(cssStyle.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputCssClass.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed}
            />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputCssClass.join(' ')}
                {...props.elementConfig}
                vlaue={props.value} onChange={props.changed}
            />;
            break;
        case ('select'):
            inputElement = (
                <select className={inputCssClass.join(' ')} vlaue={props.value} onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputCssClass.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed}
            />;
    }

    return (
        <div className={cssStyle.Input}>
            <label className={cssStyle.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;