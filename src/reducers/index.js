import authReducer from './authReducer'
import familyReducer from './familyReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    family: familyReducer,
})

export default rootReducer