import {combineReducers} from 'redux'
import ticketReasonReducer from './ticketReducer'

const rootReducer = combineReducers({
    ticketReason: ticketReasonReducer
});

export default rootReducer