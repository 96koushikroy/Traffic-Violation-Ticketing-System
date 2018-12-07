import {combineReducers} from 'redux'
import ticketReasonReducer from './ticketReasonReducer'
import ticketReducer from './ticketReducer'
import authReducer from './authReducer'
import errorReducer from './errorReducer'
import policeReducer from './policeReducer'
import profileReducer from './profileReducer'


const rootReducer = combineReducers({
    ticketReason: ticketReasonReducer,
    ticket: ticketReducer,
    auth: authReducer,
    error: errorReducer,
    police: policeReducer,
    profile: profileReducer
});

export default rootReducer