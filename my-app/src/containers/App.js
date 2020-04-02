import React, {Component} from 'react';
import classes from './App.module.css';
import PersonList from '../components/PersonList/PersonList';
import Cockpit from '../components/Cockpit/Cockpit';

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

    let personList = null;
    if (this.state.showPersons){
      personList = (
          <PersonList 
          persons = {this.state.persons}
          click = {this.deletePersonsHandler}
          change = {this.nameChangedHandler}>
          </PersonList>
      );
    };

    return(
     <div className={classes.App}>
       <Cockpit
       personLen={this.state.persons.length}
       click={this.togglePersonsHandler}
       showPersons={this.state.showPersons}>
       </Cockpit>
       {personList}
     </div> 
    );
  };
};

export default App;
