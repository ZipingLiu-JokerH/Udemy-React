import React, {Component} from 'react';
import classes from './App.module.css';
import PersonList from '../components/PersonList/PersonList';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../components/hocComponent/Aux';
import withCssClass from '../hoc/withCssClass';
import AuthContext from '../context/authContext';

class App extends Component{

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      {id:"asdf1",name:'ziping', age:23, },
      {id:"asdf2",name:'fangyuan', age:25},
      {id:"asdf3",name:'HJ', age:24}
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };


  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    // return new state, here we simply return the old one
    return state
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
};

  componentDidUpdate(prevProps, prevState){
    console.log('[App.js] componentDidUpdate');
}


  loginHandler = () => {
    this.setState({authenticated:true});
  }

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

    this.setState( (prevState, props) => {
      return {
        persons:newPersons, 
        changeCounter: prevState.changeCounter+1
      };
    });
  }

  render(){

    console.log('[App.js] render')

    let personList = null;
    if (this.state.showPersons){
      personList = (
          <PersonList 
          persons = {this.state.persons}
          click = {this.deletePersonsHandler}
          change = {this.nameChangedHandler}
          isAuthenticated = {this.state.authenticated}>
          </PersonList>
      );
    };

    return(
     <Aux>
       <button onClick={() => {this.setState({showCockpit:false});}}>Remove Cockpit</button>
       <AuthContext.Provider value={{authenticated:this.state.authenticated}}>
          {this.state.showCockpit ?
          <Cockpit
          title={this.props.title}
          personLen={this.state.persons.length}
          click={this.togglePersonsHandler}
          showPersons={this.state.showPersons}
          login={this.loginHandler}>
          </Cockpit>:null}
          {personList}
        </AuthContext.Provider>
     </Aux> 
    );
  };
};

export default withCssClass(App, classes.App);
