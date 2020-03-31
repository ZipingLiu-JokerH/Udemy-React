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
