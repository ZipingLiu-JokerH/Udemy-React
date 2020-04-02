import React from 'react'

import Person from './Person/Person'

const personList = (props) => props.persons.map((person, index) => {
    return <Person name={person.name} age={person.age} key = {person.id}
        click={() => props.click(index)}
        change={(event) => props.change(event, person.id)}/>
});

export default personList;