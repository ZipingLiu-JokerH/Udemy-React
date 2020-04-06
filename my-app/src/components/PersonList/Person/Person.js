import React, {Component} from 'react';
import classes from './Person.module.css';
import Aux from '../../hocComponent/Aux';
import withCssClass from '../../../hoc/withCssClass';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/authContext';

class Person extends Component {

    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount(){
        this.inputElementRef.current.focus();
    }

    render() {
        console.log('[Person.js] rendering...');
        return (
            <Aux cssClass={classes.Person}>
                {this.context.authenticated? <p>authenticated</p> :<p> please log in</p>}
                <p onClick={this.props.click}>I'm {this.props.name} and {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.change}
                    ref = {this.inputElementRef}
                    defaultValue={this.props.name}>
                </input>
            </Aux>
        );
    };
};

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    change: PropTypes.func
};

export default withCssClass(Person, classes.Person);