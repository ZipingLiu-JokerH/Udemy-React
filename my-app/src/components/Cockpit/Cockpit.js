import React from 'react';

import classes from './Cockpit.module.css';

const cockpit = (props) => {
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }
    const assignclasses = [];
    if(props.personLen <= 2){
      assignclasses.push(classes.red);
    }
    if(props.personLen <= 1){
      assignclasses.push(classes.bold);
    }

    return(
        <div className={classes.Cockpit}>
            <h1>Hi, I'm a React App</h1>
            <p className = {assignclasses.join(' ')}>This is really working</p>
            <button className={btnClass}
            onClick={props.click}>Toggle Persons</button>
        </div>
    );
};

export default cockpit;






