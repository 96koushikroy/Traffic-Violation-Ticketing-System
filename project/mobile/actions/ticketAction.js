import {GET_TICKET_REASONS} from './actionType'
import axios from 'axios'

//common ticketreason getter 
export const getTicketReasons = () => dispatch => {
    axios.get('http://localhost:3001/api/ticketreason/view')
    .then(res =>{
        dispatch({
            type: GET_TICKET_REASONS,
            payload: res.data
        })
    })
}