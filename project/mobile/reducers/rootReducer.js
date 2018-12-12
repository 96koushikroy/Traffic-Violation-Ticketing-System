import {combineReducers} from 'redux'
import ticketReasonReducer from './ticketReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'

const rootReducer = combineReducers({
    ticketReason: ticketReasonReducer,
    auth: authReducer,
    error: errorReducer
});

export default rootReducer