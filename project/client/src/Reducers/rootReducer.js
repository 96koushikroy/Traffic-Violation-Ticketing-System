import {combineReducers} from 'redux'
import ticketReasonReducer from './ticketReasonReducer'
import ticketReducer from './ticketReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'


const rootReducer = combineReducers({
    ticketReason: ticketReasonReducer,
    ticket: ticketReducer,
    auth: authReducer,
    error: errorReducer
});

export default rootReducer