import constants from '../constants/auth'
import { proxy, handleError } from '../api/api'

const { REGISTER, REGISTER_FAILED, REGISTER_SUCCEDED, LOGIN, LOGIN_SUCCEDED, LOGIN_FAILED } = constants

export const registerUserAction = function ({name, password}) {
    const request = proxy.post('users/register', {name, password})
    return async (dispatch) => {
        dispatch(registerStarted())
        try{
            let resp = await request
            let {message} = await resp.data
            if(message !== undefined) {
                dispatch(registerFailed(message))
            }else 
                dispatch(registerSucceded())
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(registerFailed(errorMessage))
        }
    }
    function registerStarted() { return { type: REGISTER , payload: { error: false, loading: true }} }
    function registerSucceded() { return { type: REGISTER_SUCCEDED, payload: { registered: true, loading: false } } }
    function registerFailed(error) { return { type: REGISTER_FAILED, payload: { error, loading: false} } }
}

export const loginUserAction = ({name, password}) => {
    return async (dispatch) => {
        dispatch(loginStarted())
        try{
            let resp = await proxy.post('users/login', {name, password})
            let {user, token, message } = await resp.data
            if(user && user !== '' && user !== undefined)
                sessionStorage.setItem('name', user)
            if(token && token !== '' && token !== undefined )
                sessionStorage.setItem('token', token)
            if(user === null || user === undefined || token === undefined) {
                dispatch(loginFailed(message))
            }else 
                dispatch(loginSucceded(user))
        }catch(error) {
            let errorMessage = handleError(error)
            dispatch(loginFailed(errorMessage))
        }
    }
    function loginStarted() { return { type: LOGIN, payload: { error: false, loading: true } } }
    function loginSucceded(user) { return { type: LOGIN_SUCCEDED, payload: { user, loading: false } } }
    function loginFailed(error) { return { type: LOGIN_FAILED, payload: {loading: false, error} } }
}
