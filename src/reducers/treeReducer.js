import initialState from './initialState'
import globals from '../constants/tree'

const treeReducer = (state= initialState, action) => {
    console.log('treeReducer', action.payload)
    switch(action.type) {
        case globals.FetchFamily_Success:
            return { ...state, family: [state.family, action.payload.members], ...action.payload}
        default: 
            return { ...state, ...action.payload }
    }
}

export default treeReducer