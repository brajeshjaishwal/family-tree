import authReducer from './authReducer'
import treeReducer from './treeReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    tree: treeReducer,
})

export default rootReducer