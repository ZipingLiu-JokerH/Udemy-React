import React from 'react';
import './Person.css'

const person = (props) => {
    return (
        <div className="Person">
            <p onClick={props.click}>I'm {props.name} and {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} defaultValue={props.name}></input>
        </div>
    );
};

export default person;