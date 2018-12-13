import {GET_TICKET_REASONS, GET_TICKETS, VIEW_TICKET, DELETE_TICKET} from './actionType'
import axios from 'axios'
import {BASE_URL} from '../config'

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

