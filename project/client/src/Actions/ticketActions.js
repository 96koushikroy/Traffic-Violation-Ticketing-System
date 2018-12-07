import {ADD_TICKET, GET_TICKETS, VIEW_TICKET, DELETE_TICKET, GET_ADMIN_TICKETS, APPROVE_TICKET, APPROVE_SINGLE_TICKET, GET_DRIVER_TICKETS, GET_ERRORS} from './actionType'
import axios from 'axios'
import {NotificationManager} from 'react-notifications';

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
    .catch(err => {
        NotificationManager.error(err.response.data.title);
    })
   

    //// handle error with an action .catch()
}

export const getTickets = () => dispatch => {
    axios.get('/api/ticket/police/view')
    .then(res =>{
        dispatch({
            type: GET_TICKETS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
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


export const getAdminTickets = () => dispatch => {
    axios.get('/api/ticket/admin/view')
    .then(res =>{
        dispatch({
            type: GET_ADMIN_TICKETS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
    
}

export const approveTicket = (tid) => dispatch => {
    axios.get(`/api/ticket/admin/approve/${tid}`)
    .then(res =>{
        dispatch({
            type: APPROVE_TICKET,
            payload: tid
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

//approveSingleTicket

export const approveSingleTicket = (tid) => dispatch => {
    axios.get(`/api/ticket/admin/approve/${tid}`)
    .then(res =>{
        dispatch({
            type: APPROVE_SINGLE_TICKET,
            payload: tid
        })
        
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}

export const getDriverTickets = () => dispatch => {
    axios.get('/api/ticket/driver/view')
    .then(res =>{
        dispatch({
            type: GET_DRIVER_TICKETS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    })
}