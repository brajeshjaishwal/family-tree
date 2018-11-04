import initialState from './initialState'

const authReducer = (state= initialState, action) => {
    switch(action.type) {
        default: 
            return { ...state, ...action.payload }
    }
}

export default authReducer