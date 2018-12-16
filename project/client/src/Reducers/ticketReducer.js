import {ADD_TICKET, GET_TICKETS, VIEW_TICKET, DELETE_TICKET, GET_ADMIN_TICKETS, APPROVE_TICKET, APPROVE_SINGLE_TICKET, GET_DRIVER_TICKETS, GET_ADMIN_ALL_TICKETS} from '../Actions/actionType'

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
        state.tickets = JSON.parse(JSON.stringify(dd));
        return{
            ...state
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
    else if(action.type === GET_ADMIN_TICKETS){
        return{
            ...state,
            tickets: action.payload
        }
    }
    else if(action.type === APPROVE_TICKET){
        let dd = state.tickets.filter(ticket => ticket.id != action.payload);
        return{
            ...state,
            tickets: dd
        }
    }
    else if(action.type === APPROVE_SINGLE_TICKET){
        let dd = state.ticket
        dd.status = 1;
        let xx = JSON.parse(JSON.stringify(dd));
        return{
            ...state,
            ticket: xx
        }
    }
    else if(action.type === GET_DRIVER_TICKETS){
        return{
            ...state,
            tickets: action.payload
        }
    }
    else if(action.type === GET_ADMIN_ALL_TICKETS){
        return{
            ...state,
            tickets: action.payload
        }
    }
    return state
}

export default ticketReducer