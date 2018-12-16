import {ADD_TICKET, GET_TICKET_REASONS, GET_TICKETS, VIEW_TICKET, DELETE_TICKET} from './actionType'
import axios from 'axios'
import {BASE_URL} from '../config'
import { showMessage } from "react-native-flash-message";

//method to add a new ticket
export const addTicket = (TicketData) => dispatch => {
    TicketData.reason_id = TicketData.selectedReason;
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
    .post(BASE_URL + '/api/ticket/insert', TicketData)
    .then(res => {
        dispatch({
            type: ADD_TICKET,
            payload: res.data
        })
        showMessage({
            message: "Ticket Added Successfully",
            type: "success",
        });
    })
    .catch(err => {
        showMessage({
            message: err.response.data.title,
            type: "danger",
        });
    })
    //// handle error with an action .catch()
}



//common ticketreason getter 
export const getTicketReasons = () => dispatch => {
    axios.get(BASE_URL + '/api/ticketreason/view')
    .then(res =>{
        dispatch({
            type: GET_TICKET_REASONS,
            payload: res.data
        })
    })
}

//common action to view all the ticket for the police
export const getTickets = () => dispatch => {
    axios.get(BASE_URL+'/api/ticket/police/view')
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
        showMessage({
            message: err.response.data.title,
            type: "error",
        });
    })
}

//method to delete a ticket given the id of the ticket
export const deleteTicket = (id) => dispatch => {
    axios.get(BASE_URL + `/api/ticket/delete/${id}`)
    .then(res =>{
        dispatch({
            type: DELETE_TICKET,
            payload: id
        })
        showMessage({
            message: "Ticket Deleted Successfully",
            type: "success",
        });
    })
}

//method to view a ticket given the id of the ticket
export const viewTicket = (id) => dispatch => {
    axios.get(BASE_URL + `/api/ticket/view/details/${id}`)
    .then(res => {
        dispatch({
            type: VIEW_TICKET,
            payload: res.data
        })
    })
}

