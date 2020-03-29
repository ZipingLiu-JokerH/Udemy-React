import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component{
  state = {
    persons: [
      {name:'ziping', age:23},
      {name:'fangyuan', age:25},
      {name:'HJ', age:24}
    ]
  };

  switchNameHandler = (newName) => {
    // DONT DO THIS: this.state.persons[0].name = "ziping Liu"
    this.setState({
      persons: [
        {name:newName, age:23},
        {name:'fangyuan', age:25},
        {name:'HJ', age:25}
      ]
    })
  };

  changeName = (event) => {
    this.setState({
      persons: [
        {name:'ziping', age:23},
        {name:'fangyuan', age:25},
        {name:event.target.value, age:25}
      ]
    })
  };


  render(){

    const style = {
      backgroundColor:'white',
      font:'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return(
     <div className="App">
       <h1>Hi, I'm a React App</h1>
       <button 
       style = {style}
       onClick={this.switchNameHandler.bind(this, 'ziping liu')}>Switch name</button>
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
     </div> 
    );
  };
};

export default App;
