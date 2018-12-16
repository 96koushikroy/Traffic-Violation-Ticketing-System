import {ADD_TICKET_REASONS, DELETE_TICKET_REASON, GET_TICKET_REASONS} from './actionType'
import axios from 'axios'
import {NotificationManager} from 'react-notifications';

//action to add a ticket reason
export const addTicketReason = (TicketReasonData) => dispatch => {
    axios
    .post('/api/ticketreason/insert', TicketReasonData)
    .then(res => {
        dispatch({
            type: ADD_TICKET_REASONS,
            payload: res.data
        })

        NotificationManager.success('Ticket Reason Added Successfully')
    })
    .catch(err=>{
        NotificationManager.error(err.response.data.title);
    })
    
    //// handle error with an action .catch()
}

//common ticketreason getter 
export const getTicketReasons = () => dispatch => {
    axios.get('/api/ticketreason/view')
    .then(res =>{
        dispatch({
            type: GET_TICKET_REASONS,
            payload: res.data
        })
    })
    .catch(err=>{
        NotificationManager.error(err.response.data.title);
    })
}

//delete ticket reason action
export const deleteTicketReason = (id) => dispatch => {
    
    axios.get(`/api/ticketreason/delete/${id}`)
    .then(res =>{
        dispatch({
            type: DELETE_TICKET_REASON,
            payload: id
        })

        NotificationManager.success('Deleted Successfully')
    })
    .catch(err=>{
        NotificationManager.error(err.response.data.title);
    })
}