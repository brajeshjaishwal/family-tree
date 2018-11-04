import constants from '../constants/auth'
import proxy from '../api/api'

const { REGISTER, REGISTER_FAILED, REGISTER_SUCCEDED, LOGIN, LOGIN_SUCCEDED, LOGIN_FAILED } = constants

export const registerUserAction = function ({name, password}) {
    const request = proxy.post('register', {name, password})
    return async (dispatch) => {
        dispatch(registerStarted())
        try{
            let resp = await request
            let {user, token } = await resp.data
            sessionStorage.setItem('name', user)
            sessionStorage.setItem('token', token)
            dispatch(registerSucceded(user))
        }catch(error) {
            dispatch(registerFailed(error))
        }
    }
    function registerStarted() { return { type: REGISTER} }
    function registerSucceded(user) { return { type: REGISTER_SUCCEDED, payload: { user, loading: false } } }
    function registerFailed(error) { return { type: REGISTER_FAILED, payload: { error, loading: false}}}
}

export const loginUserAction = ({name, password}) => {
    //const request = proxy.post('login', {name, password})
    return async (dispatch) => {
        dispatch(loginStarted())
        try{
            let resp = await proxy.post('login', {name, password})
            let {user, token } = await resp.data
            sessionStorage.setItem('name', user)
            sessionStorage.setItem('token', token)
            dispatch(loginSucceded(user))
        }catch(error) {
            dispatch(loginFailed(error))
        }
    }
    function loginStarted() { return { type: LOGIN, payload: { loading: true } } }
    function loginSucceded(user) { return { type: LOGIN_SUCCEDED, payload: { user, loading: false } } }
    function loginFailed(error) { return { type: LOGIN_FAILED, payload: {loading: false, error} } }
}
