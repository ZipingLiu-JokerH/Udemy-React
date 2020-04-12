import React, {Component} from 'react';
import cssStyle from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState){
        return this.props.show !== nextProps.show;
    }

    componentWillUpdate(){
        console.log('[Modal] WillUpdate');
    }

    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                className={cssStyle.Modal}
                style={{
                    transform: this.props.show? 'translateY(0)':'translateY(-100vh)',
                    opacity: this.props.show? '1': '0'
                }}>
                {this.props.children}
                </div>
            </Aux>
        );
    };

}

export default Modal;