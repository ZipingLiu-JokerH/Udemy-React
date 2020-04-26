import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button'; 
import cssStyle from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode:''
        },
        // true when the spinner should show up. (the spinner when user finish the form and click ORDER NOW)
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading:true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer:{
                name: 'Ziping Liu',
                address: {
                    street: '222 king street',
                    zipcode: '123456',
                    country: 'Canada'
                },
                email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading:false});
            });
    }


    render () {
        let form = (
            <form>
                <input className={cssStyle.Input} type='text' name='name' placeholder='Your Name' />
                <input className={cssStyle.Input} type='email' name='email' placeholder='Your Email' />
                <input className={cssStyle.Input} type='text' name='street' placeholder='Street Name' />
                <input className={cssStyle.Input} type='text' name='postal' placeholder='Postal Code' />
                <Button btnType='Success' clicked={this.orderHandler}>ORDER NOW</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }

        return (
            <div className={cssStyle.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    };
}

export default ContactData;