import {ADD_TICKET, GET_TICKETS, VIEW_TICKET, DELETE_TICKET} from '../Actions/actionType'

const initState = {
    car_number: '',
    police_id: '',
    selectedReason: null,
    other_documents: '',
    amount: '',
    issue_date: '',
    deadline_date: '',
    tickets:[],
    ticket: null
}

const ticketReducer = (state = initState, action) => {
    if(action.type === ADD_TICKET){
        let dd = state.tickets;
        dd.push(action.payload);
        return{
            ...state,
            tickets: dd
        }
    }
    else if(action.type === GET_TICKETS){
        return{
            ...state,
            tickets: action.payload
        }
    }
    else if(action.type === DELETE_TICKET){
        let dd = state.tickets.filter(ticket => ticket.id != action.payload);
        return{
            ...state,
            tickets: dd
        }
    }
    else if(action.type === VIEW_TICKET){
        return{
            ...state,
            ticket: action.payload
        }
    }
    return state
}

export default ticketReducer