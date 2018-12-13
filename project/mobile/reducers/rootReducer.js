import {combineReducers} from 'redux'
import ticketReducer from './ticketReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import profileReducer from './profileReducer'

const rootReducer = combineReducers({
    ticket: ticketReducer,
    auth: authReducer,
    error: errorReducer,
    profile: profileReducer
});

export default rootReducer