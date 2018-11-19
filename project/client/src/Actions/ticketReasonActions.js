import {ADD_TICKET_REASONS, DELETE_TICKET_REASON, UPDATE_TICKET_REASON, GET_TICKET_REASONS} from './actionType'
import axios from 'axios'


export const addTicketReason = (TicketReasonData) => dispatch => {
    axios
    .post('/api/ticketreason/insert', TicketReasonData)
    .then(res => {
        dispatch({
            type: ADD_TICKET_REASONS,
            payload: res.data
        })
    })
    
    //// handle error with an action .catch()
}

export const getTicketReasons = () => dispatch => {
    axios.get('/api/ticketreason/view')
    .then(res =>{
        dispatch({
            type: GET_TICKET_REASONS,
            payload: res.data
        })
    })
}

export const deleteTicketReason = (id) => dispatch => {
    axios.get(`/api/ticketreason/delete/${id}`)
    .then(res =>{
        dispatch({
            type: DELETE_TICKET_REASON,
            payload: id
        })
    })
}