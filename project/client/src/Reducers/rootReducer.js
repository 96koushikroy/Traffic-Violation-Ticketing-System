import {combineReducers} from 'redux'
import ticketReasonReducer from './ticketReasonReducer'
import ticketReducer from './ticketReducer'
import authReducer from './authReducer'


const rootReducer = combineReducers({
    ticketReason: ticketReasonReducer,
    ticket: ticketReducer,
    auth: authReducer
});

export default rootReducer