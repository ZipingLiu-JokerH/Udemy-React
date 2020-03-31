# Section4: Working with Lists and Conditionals

#### Conditionaly showing element

- method 1: we can wrap the whole element into one div and use `{}` to enclose it, and then, since it's in `{}` we are writing pure Javascript code. We can using the Ternary operator to decide whether to display or not display the element by looking at the conditions.
```JSX
{
    this.state.showPersons ? 
    <div>
        <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age}/>
                  
        <Person 
        name={this.state.persons[1].name} 
        age={this.state.persons[1].age}
        click={this.switchNameHandler.bind(this, 'ZIPING LIU')}> I love Food</Person>
                  
        <Person 
        name={this.state.persons[2].name} 
        age={this.state.persons[2].age}
        change={this.changeName}/>
    </div> : null
}
```

- method 2 (Prefer): Using the fact that each time React want to update something in the page, the Component's render method is called, not just the return statement. Hence, we can add Javascript logic befor the return statement to decide what content will be teturned.
```JSX
let persons = null;
if (this.state.showPersons){
persons = (
    <div>
      <Person 
      name={this.state.persons[0].name} 
      age={this.state.persons[0].age}/>

      <Person 
      name={this.state.persons[1].name} 
      age={this.state.persons[1].age}
      click={this.switchNameHandler.bind(this, 'ZIPING LIU')}> I <l>Food</Person>
          
       <Person 
       name={this.state.persons[2].name} 
       age={this.state.persons[2].age}
       change={this.changeName}/>
     </div>
    );
};

return(
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <button 
      style = {style}
      onClick={this.togglePersonsHandler}>Toggle Persons</button>
      {persons}
    </div> 
);
```

#### Outputting Lists
Still using the JavaScript functionality, we use array method to produce an array of JSX code.
```JSX
if (this.state.showPersons){
  persons = (
    <div>
      {this.state.persons.map( person => {
        return <Person name={person.name} age={person.age}/>
      })};
    </div>
  );
};
```

##### change the list elements:  
notice the part `click={() =>this.deletePersonsHandler(index)}` we are using arrow function to return a reference of a function. The reason we did this is because we need arguments for this callback function.
```JSX
deletePersonsHandler = index => {
    const newPersons = this.state.persons;
    newPersons.splice(index, 1);
    this.setState({persons: newPersons});
};

if (this.state.showPersons){
    persons = (
        <div>
         {this.state.persons.map( (person, index) => {
           return <Person name={person.name} age={person.age} click={() =>this.deletePersonsHandler(index)}/>
          })}
        </div>
    );
};
```
There is a flaw in the code above, since array & object is reference typed, the `newPersons` is only a reference to the `state.persons` by performing `splice` on `newPersons`, we are actually performing `splice` directly on `state.persons`. This will lead to unexpected behaviour. We should using the spread operator to create a deep copy of the array.
```JSX
deletePersonsHandler = index => {
    const newPersons = [...this.state.persons];
    newPersons.splice(index, 1);
    this.setState({persons: newPersons});
};
```
When render a list of data, the key property is important, it helps react update the list more efficiently. The key should be unique globally.  
<span style="color: red">Hence, always remember to give key property when render a list of item</span>   

App.js
```JSX
import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component{
  state = {
    persons: [
      {id:"asdf1",name:'ziping', age:23, },
      {id:"asdf2",name:'fangyuan', age:25},
      {id:"asdf3",name:'HJ', age:24}
    ],
    showPersons: false
  };

  togglePersonsHandler = () => {
    this.setState({showPersons: !this.state.showPersons});
  };

  deletePersonsHandler = index => {
    const newPersons = [...this.state.persons];
    newPersons.splice(index, 1);
    this.setState({persons: newPersons});
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(el => el.id === id);
    const newPerson = {...this.state.persons[personIndex]};
    newPerson.name = event.target.value;

    const newPersons = [...this.state.persons];
    newPersons[personIndex] = newPerson;
    this.setState({persons:newPersons});
  }


  render(){

    const style = {
      backgroundColor:'white',
      font:'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;
    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map( (person, index) => {
            return <Person name={person.name} age={person.age} key = {person.id}
            click={() => this.deletePersonsHandler(index)}
            change={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      );
    };

    return(
     <div className="App">
       <h1>Hi, I'm a React App</h1>
       <button 
       style = {style}
       onClick={this.togglePersonsHandler}>Toggle Persons</button>
       {persons}
     </div> 
    );
  };
};

export default App;

```
Person.js
```JSX
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
```















