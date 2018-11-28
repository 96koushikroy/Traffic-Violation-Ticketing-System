import {ADD_TICKET, GET_TICKETS, VIEW_TICKET, DELETE_TICKET} from './actionType'
import axios from 'axios'


export const addTicket = (TicketData) => dispatch => {
    TicketData.reason_id = TicketData.selectedReason.value;
    delete TicketData.selectedReason;

    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + '-' + m + '-' + d;

    TicketData.issue_date = yyyymmdd;

    axios
    .post('/api/ticket/insert', TicketData)
    .then(res => {
        dispatch({
            type: ADD_TICKET,
            payload: res.data
        })
    })
    
   

    //// handle error with an action .catch()
}

export const getTickets = () => dispatch => {
    axios.get('/api/ticket/view/42')
    .then(res =>{
        dispatch({
            type: GET_TICKETS,
            payload: res.data
        })
    })
    
}

export const deleteTicket = (id) => dispatch => {
    axios.get(`/api/ticket/delete/${id}`)
    .then(res =>{
        dispatch({
            type: DELETE_TICKET,
            payload: id
        })
    })
}

export const viewTicket = (id) => dispatch => {
    axios.get(`/api/ticket/view/details/${id}`)
    .then(res =>{
        dispatch({
            type: VIEW_TICKET,
            payload: res.data
        })
    })
}