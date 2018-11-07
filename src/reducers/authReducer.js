import globals from '../constants/auth'

let initialState = {
    user: '',
    token: '',
    loading: false,
    error: '',
    errorMessage: ''
}

const authReducer = (state = initialState, action) => {
    console.log('authreducer', state)
    switch(action.type) {
        case globals.LOGIN:
        case globals.LOGIN_FAILED:
        case globals.LOGIN_SUCCEDED:
            return { ...state, ...action.payload }
        case globals.REGISTER:
        case globals.REGISTER_FAILED:
        case globals.REGISTER_SUCCEDED:
            return { ...state, ...action.payload }
        default:
            return { ...state}
    }
}

export default authReducer