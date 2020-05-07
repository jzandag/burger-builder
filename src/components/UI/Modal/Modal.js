import React, { Component } from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState ){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentDidUpdate(){
        console.log('Modal did update')
    }
    render(){
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.click}/>
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                    {/* <button onClick={props.click}>Cancel</button> */}
                </div>
            </Aux>
        );
    }
}

export default Modal;
