import {GET_TICKET_REASONS, GET_TICKETS, VIEW_TICKET, DELETE_TICKET} from '../actions/actionType'

const initState = {
    reasons:[],
    tickets:[],
    ticket: null
}


const ticketReducer = (state = initState, action) => {
    if(action.type === GET_TICKET_REASONS){
        return{
            ...state,
            reasons: action.payload
        }
    }
    else if(action.type === GET_TICKETS){
        return{
            ...state,
            tickets: action.payload
        }
    }
    else if(action.type === VIEW_TICKET){
        return{
            ...state,
            ticket: action.payload
        }
    }
    else if(action.type === DELETE_TICKET){
        let dd = state.tickets.filter(ticket => ticket.id != action.payload);
        return{
            ...state,
            tickets: dd
        }
    }
    return state
}

export default ticketReducer