import React, {Component} from 'react'
import Person from './Person/Person'


class PersonList extends Component {

    // static getDerivedStateFromProps(props, state){
    //     console.log('[PersonList.js] getDerivedStateFromProps');
    //     return state;
    // };

    shouldComponentUpdate(nextProps, nextState){
        console.log('[PersonList.js] shouldComponentUpdate');
        if (nextProps.persons !== this.props.persons || nextProps.isAuthenticated !== this.props.isAuthenticated){
            return true;
        }else{
            return false;
        }
    };

    componentWillUnmount(){
        console.log('[PersonList.js] componentWillUnmount');
    }

    getSnapshotBeforeUpdate(prevProps, prevState){
        console.log('[PersonList.js] getSnapshotBeforeUpdate');
        return {message:'snapshot!'};
    };

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('[PersonList.js] componentDidUpdate');
        console.log(snapshot);
    }

    render(){
        console.log('[PersonList.js] rendering...');

        return this.props.persons.map((person, index) => {
            return (
                <Person name={person.name} age={person.age} key = {person.id}
                click={() => this.props.click(index)}
                change={(event) => this.props.change(event, person.id)}/>);
        });  
    };
};

export default PersonList;