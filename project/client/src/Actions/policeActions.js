import axios from 'axios'
import {ADD_POLICE} from './actionType'


export const addPolice = (PoliceData) => dispatch => {
    axios
    .post('/api/police/register', PoliceData)
    .then(res => {
        dispatch({
            type: ADD_POLICE,
            payload: res.data
        })
    })
}