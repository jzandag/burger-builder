import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId 
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        console.log(expirationTime * 1000);
        setTimeout(() => {
            console.log('setTimeout baket');
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        //Authenticate
        dispatch(authStart())
        const authData ={
            email,
            password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCWftkZG8NCofcSJSbm4P9wmpGARyzO5cA'
        if(!isSignUp)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWftkZG8NCofcSJSbm4P9wmpGARyzO5cA'
        axios.post(url, authData)
        .then((result) => {
             console.log('ey')
             const expirationDate = new Date(new Date().getTime() + result.data.expiresIn * 1000) 
             localStorage.setItem('token', result.data.idToken)
             localStorage.setItem('expirationDate', expirationDate)
             localStorage.setItem('userId', result.data.localId)
             dispatch(authSuccess(result.data.idToken, result.data.localId))
             dispatch(checkAuthTimeout(result.data.expiresIn))
        }).catch((err) => {
            console.log(err)
            dispatch(authFail(err))
        });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}

//asses your self, have a greatful heart, in everything give thanks 

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            console.log('lo');
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            console.log(expirationDate);
            if(expirationDate < new Date()){
                console.log('bakit? ', expirationDate, new Date());
                dispatch(logout())
            }else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000))
            }
        }

    }
}