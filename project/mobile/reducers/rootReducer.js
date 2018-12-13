import {combineReducers} from 'redux'
import ticketReducer from './ticketReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

const rootReducer = combineReducers({
    ticket: ticketReducer,
    auth: authReducer,
    error: errorReducer
});

export default rootReducer