import {ADD_TICKET_REASONS, DELETE_TICKET_REASON, UPDATE_TICKET_REASON, GET_TICKET_REASONS, GET_TICKET_REASON_DETAILS} from '../Actions/actionType'

const initState = {
    reason_name:'',
    reason_details: '',
    reasons:[]
}

const ticketReasonReducer = (state = initState, action) => {
    if(action.type === ADD_TICKET_REASONS){
        //let dd = state.reasons;
        //dd.push(action.payload);
        //console.log('okok', dd)
        return{
            ...state,
            reasons: [action.payload, ...state.reasons]
        }
    }
    else if(action.type === GET_TICKET_REASONS){
        return{
            ...state,
            reasons: action.payload
        }
    }
    else if(action.type === DELETE_TICKET_REASON){
        let dd = state.reasons.filter(reason => reason.id != action.payload);
        return{
            ...state,
            reasons: dd
        }
    }
    return state
}


export default ticketReasonReducer