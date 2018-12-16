import {ADD_TICKET, GET_TICKETS, VIEW_TICKET, DELETE_TICKET, GET_ADMIN_TICKETS, APPROVE_TICKET, APPROVE_SINGLE_TICKET, GET_DRIVER_TICKETS, GET_ADMIN_ALL_TICKETS, GET_ERRORS} from './actionType'
import axios from 'axios'
import {NotificationManager} from 'react-notifications';

//method to add a new ticket
export const addTicket = (TicketData) => dispatch => {
    TicketData.reason_id = TicketData.selectedReason.value;
    delete TicketData.selectedReason;
    TicketData.status = 0

    var x = new Date();
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + '-' + m + '-' + d;

    TicketData.issue_date = yyyymmdd; //issue date will be stored here in yyyy-mm-dd format
    
    axios
    .post('/api/ticket/insert', TicketData)
    .then(res => {
        dispatch({
            type: ADD_TICKET,
            payload: res.data
        })
        NotificationManager.success('Ticket Added Successfully!')
    })
    .catch(err => {
        NotificationManager.error(err.response.data.title);
    })
   

    //// handle error with an action .catch()
}

//common action to view all the ticket for the police
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
        NotificationManager.error(err.response.data.title);
    })
    
}
//delete one ticket based on the ticket id on the params
export const deleteTicket = (id) => dispatch => {
    axios.get(`/api/ticket/delete/${id}`)
    .then(res =>{
        dispatch({
            type: DELETE_TICKET,
            payload: id
        })
        NotificationManager.success('Ticket Deleted Successfully!')
    })
}

//view one ticket based on the ticket id on the params
export const viewTicket = (id) => dispatch => {
    axios.get(`/api/ticket/view/details/${id}`)
    .then(res =>{
        dispatch({
            type: VIEW_TICKET,
            payload: res.data
        })
    })
}


//admin gets all the tickets that needs to be approved here
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
        NotificationManager.error(err.response.data.title);
    })
    
}

//approve ticket action handler
export const approveTicket = (tid) => dispatch => {
    axios.get(`/api/ticket/admin/approve/${tid}`)
    .then(res =>{
        dispatch({
            type: APPROVE_TICKET,
            payload: tid
        })
        NotificationManager.success('Approved Successfully!')
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}

//approve one ticket used in the single ticket view page
export const approveSingleTicket = (tid) => dispatch => {
    axios.get(`/api/ticket/admin/approve/${tid}`)
    .then(res =>{
        dispatch({
            type: APPROVE_SINGLE_TICKET,
            payload: tid
        })
        NotificationManager.success('Approved Successfully!')   
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}

//driver gets all the tickets that it has received
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
        NotificationManager.error(err.response.data.title);
    })
}

//admin gets all the tickets for ticket search
export const getAdminAllTickets = () => dispatch => {
    axios.get('/api/ticket/admin/viewall')
    .then(res =>{
        dispatch({
            type: GET_ADMIN_ALL_TICKETS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
    
}