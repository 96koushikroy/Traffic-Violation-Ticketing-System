import {GET_TICKET_REASONS} from '../actions/actionType'

const initState = {
    reasons:[]
}


const ticketReasonReducer = (state = initState, action) => {
    if(action.type === GET_TICKET_REASONS){
        return{
            ...state,
            reasons: action.payload
        }
    }
    return state
}

export default ticketReasonReducer