import initialState from './initialState'

const authReducer = (state = initialState, action) => {
    return { ...state, ...action.payload }
}

export default authReducer