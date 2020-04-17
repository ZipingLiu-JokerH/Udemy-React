# Section10:  Burger Builder Project: Accessing a server

In this module, we will use Firebase https://firebase.google.com/  

we have created an axios instance in the `axios-orders.js` file
```javascript
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burgerbuilder-77cc6.firebaseio.com/',

});

export default instance;
```

we send HTTP post request whenever the user click the ORDER NOW and then Continue.

We also add a spinner when the date is sending. https://projects.lukehaas.me/css-loaders/, make use of the resource provide here.

A little side notes: When things happened not the way we wanted, be more precise, something did not display the way we wanted to be. We alwasy go for check if we have implement `shouldComponentUpdate` correctly.

***

A more flexiable way to handle error:  
we want to create a modal whenever an error occure for some Component. We can make use of the hoc, but in a different creation form.  
More detailed in https://github.com/ZipingLiu-JokerH/Udemy-React/blob/master/notes/Section7-DeeperReactComponents%26Internal.md
```JSX
import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{

        state = {
            error: null
        }

        componentDidMount(){
            axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
            });
            axios.interceptors.response.use(res => res, error=>{
                this.setState({error:error});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        }

        render(){
            return(
                <Aux>
                <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                    {this.state.error? this.state.error.message: null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
            );
        };
    };
};

export default withErrorHandler;
```

Keep in mind of this HOC errorHandler. If the wrapper element has error in the `ComponentDidMount` step, this will not handle the error. Since, this HOC's handler will only be called once all the children has finished.   
How to fix this?

- change to `ComponentWillMount` or
- use the constructor

Also, notice that we have add interceptors for each time this wrapper component is being created. This will lead to memory leak if we use this wrapper multiple times. Hence, we need to remove interceptors each time when we no longer use this component.
```
componentWillUnmount(){
    axios.interceptors.request.eject(this.reqInterceptor);
    axios.interceptors.response.eject(this.resInterceptor);
}
```
