import axios from 'axios'
import {ADD_POLICE, GET_ALL_POLICE} from './actionType'


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


export const getAllPolice = () => dispatch => {
    axios
    .get('/api/police/view')
    .then(res => {
        dispatch({
            type: GET_ALL_POLICE,
            payload: res.data
        })
    })
}