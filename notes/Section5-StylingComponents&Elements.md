# Section5: Styling React Components & Elements

#### Setting styles Dynamically and Class Names Dynamically
still using the face all is Javascript, we can use conditon to change the style befor we adding the style to a components. We also can create an array of classname depending the state of our app, and use this classname array to assign className for components

#### Adding and Using Radium
By the limition of inline style in JSX, we can not add hover style to links and buttons, and manymore(all sudo selector, media Queries).  
We can use an external package <span style="color: blue">radium</span> to solve this. This will allows us to use sudo selector and media queries with inline styling.  
`npm install --save radium`  
Remember to wrap your component using Radium `export default Radium(App)`
A higher order component, adding more functionality to component.  

- styling sudo selector(:hover): we using `':hover':{styling}` in the style object
- Media Queries: in the case we want to add media queries, we need to use a component provided by Radium to wrap our entire application, the `<styleRoot>` element. using `'@media (min-width: 500px)': {width:'450px'}` in the style object

#### Another Library: Styled-Components
https://styled-components.com/  
npm install --save styled-components  
in order to use styled-components, we first need to 
`import styled from 'styled-components'`, then the library provided a new component for every HTML tag. div <--> styled.div. We use styled.div\`style\` to style the div tag. In order to apply the style, we need to create a custome HTML element for the styled components. The style we defined here, using pure CSS code. When using sudo-selector, we use an `&` in front of the `:` to identify it's the sudo-selector of this element.  

To change style dynamically, we can pass props to the components, and using javascript code inside \`\` to decide which styling to give.  

person.js
```JSX
import React from 'react';
import styled from 'styled-components'

const StyledDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width: 500px) {
        width:450px
    }
`;


const person = (props) => {
    return (
        <StyledDiv>
            <p onClick={props.click}>I'm {props.name} and {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} defaultValue={props.name}></input>
        </StyledDiv>
    );
};

export default person;
```
App.js

```JSX
import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color:${props => props.myalt? 'red': 'green'};
  color: white;
  font:inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover{
    background-color:${props => props.myalt? 'pink': 'lightgreen'};
    color:black
  }
`;

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

    const classes = [];
    if(this.state.persons.length <= 2){
      classes.push('red');
    }
    if(this.state.persons.length <= 1){
      classes.push('bold');
    }


    return(
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working</p>
          <StyledButton myalt={this.state.showPersons} onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton>
          {persons}
        </div> 
    );
  };
};

export default App;

```

#### Working with CSS Modules(Prefer)
Styled-Components is good, but it makes the js file too big since all the css code there. We want to write CSS in .css file and also being able to apply the style to some element, not globally.
https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/  
for Person.module.css, we can import this file as `import classes from Person.module.css`, when we want to use, just let `className = {classes.Person}`, this will restrice the styling to only the file which import this css file. In the case of change styling dynamically, we can add and remove from the className.
