import {combineReducers} from 'redux'
import ticketReasonReducer from './ticketReasonReducer'

const rootReducer = combineReducers({
    ticketReason: ticketReasonReducer
});

export default rootReducer