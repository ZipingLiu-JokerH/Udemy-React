import React, { useEffect, useRef } from 'react';

import classes from './Cockpit.module.css';

const Cockpit = (props) => {

  const toggleBtnRef = useRef(null);

  useEffect(()=>{
    console.log('[cockpit.js] useEffect');
    // HTTP request
    // setTimeout(()=>{
    //   alert('saved date to cloud!');
    // }, 1000);
    toggleBtnRef.current.click();
    return () => {
      console.log('[cockpit.js] cleanup work in useEffect');
    }
  }, [props.personLen]);

  useEffect(()=>{
    console.log('[cockpit.js] 2nd useEffect');
    return () =>{
      console.log('[cockpit.js] 2nd cleanup work in useEffect');
    };
  });

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
          <h1>{props.title}</h1>
          <p className = {assignclasses.join(' ')}>This is really working</p>
          <button className={btnClass} ref={toggleBtnRef}
          onClick={props.click}>Toggle Persons</button>
          <button onClick={props.login}> Log in</button>
        </div>
    );
};

export default React.memo(Cockpit);






