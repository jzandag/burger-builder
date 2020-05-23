import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import classes from './Auth.module.css'
import * as actionTypes from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email',
                    autoComplete: "on"
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touch: false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touch: false
            }
        },
        isSignUp: true
    }

    switchModeHandler = () => {
        this.setState( prevState => {
            return {
                isSignUp: !prevState.isSignUp
            }
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    inputChangeHandler = (event, controlName) => {
        // const updatedControls = {
        //     ...this.state.controls,
        //     [controlName]: {
        //         ...this.state.controls[controlName],
        //         value: event.target.value,
        //         valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
        //         touch: true
        //     }
        // }
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touch: true
            })
        })
        this.setState({controls: updatedControls})
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetRedirectPath()
        }
    }

    render() {
        const formElements = []
        for(let key in this.state.controls){
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let form = (
            <form onSubmit={this.submitHandler}>
                {formElements.map(el => {
                    return <Input 
                                key={el.id}
                                elementType={el.config.elementType}
                                elementConfig={el.config.elementConfig}
                                value={el.config.value}
                                change={(event) => this.inputChangeHandler(event, el.id)}
                                validation={el.validation}
                                valid={el.config.valid}
                                touch={el.config.touch}
                            />
                })}
                <Button buttonType="Success" >Submit</Button>
        </form>)
        if(this.props.loading)
            form = <Spinner />

        let errorMessage = null

        if(this.props.error)
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        let authRedirect = null
        if(this.props.isAuthenticated)
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
                <Button buttonType="Danger" clicked={this.switchModeHandler}>SWITCH TO SIGN {!this.state.isSignUp ? 'UP' : 'IN'}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actionTypes.auth(email,password, isSignUp)),
        onSetRedirectPath: () => dispatch(actionTypes.setAuthRedirectPath('/')),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
