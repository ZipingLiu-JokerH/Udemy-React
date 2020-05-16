import React from 'react';
import cssStyle from './Modal.module.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {

    // const shouldComponentUpdate = (nextProps, nextState) => {
    //     return props.show !== nextProps.show || props.children !== nextProps.children;
    // }

        return(
            <Aux>
                <Backdrop show={props.show} clicked={props.modalClosed}/>
                <div 
                className={cssStyle.Modal}
                style={{
                    transform: props.show? 'translateY(0)':'translateY(-100vh)',
                    opacity: props.show? '1': '0'
                }}>
                {props.children}
                </div>
            </Aux>
        );

}

export default React.memo(Modal, (prevProps, nextProps) => {
    return prevProps.show === nextProps.show && prevProps.children === nextProps.children;
});