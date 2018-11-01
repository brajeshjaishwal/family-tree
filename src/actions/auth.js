import axios from 'axios'
import authActionConstants from '../constants/auth'

export const registerUser = ({name, userType}) => {
    const url = 'http://localhost:3300/register'
    const request = axios.post(url, {name,userType})
    return async (dispatch) => {
        dispatch(registerStarted())
        try{
            let resp = await request
            let data = await resp.data
            localStorage.setItem('registered', name)
            dispatch(registerSucceded(data))
        }catch(error) {
            dispatch(registerFailed(error))
        }
    }
}
export const registerStarted = () => {
    return {
        type: actionTypes.register,
        payload: { loading: true }
    }
}
export const registerSucceded = (user) => {
    return {
        type: actionTypes.register_success,
        payload: { user, loading: false }
    }
}
export const registerFailed = (error) => {
    return {
        type: actionTypes.register_failed,
        payload: {loading: false, error: error}
    }
}

export const loginUser = ({name, userType}) => {
    const url = 'http://localhost:3300/login'
    const request = axios.post(url, {name,userType})
    return async (dispatch) => {
        dispatch(loginStarted())
        try{
            let resp = await request
            let data = await resp.data
            let user = data.user
            localStorage.setItem('name', user.name)
            localStorage.setItem('role', user.userType)
            dispatch(loginSucceded(user))
        }catch(error) {
            dispatch(loginFailed(error))
        }
    }
}
export const loginStarted = () => {
    return {
        type: actionTypes.login,
        payload: { loading: true }
    }
}
export const loginSucceded = (user) => {
    return {
        type: actionTypes.login_success,
        payload: { user, loading: false }
    }
}
export const loginFailed = (error) => {
    return {
        type: actionTypes.login_failed,
        payload: {loading: false, error: error}
    }
}