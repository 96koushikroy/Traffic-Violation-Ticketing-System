import {combineReducers} from 'redux'
import ticketReasonReducer from './ticketReasonReducer'
import ticketReducer from './ticketReducer'


const rootReducer = combineReducers({
    ticketReason: ticketReasonReducer,
    ticket: ticketReducer
});

export default rootReducer