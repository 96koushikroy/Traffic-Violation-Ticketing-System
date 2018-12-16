import axios from 'axios'
import {ADD_POLICE, GET_ALL_POLICE, VIEW_POLICE, DELETE_POLICE, GET_ERRORS} from './actionType'
import {NotificationManager} from 'react-notifications';

//action method to register a new police
export const addPolice = (PoliceData) => dispatch => {
    axios
    .post('/api/police/register', PoliceData)
    .then(res => {
        dispatch({
            type: ADD_POLICE,
            payload: res.data
        })
        NotificationManager.success('Police Added Successfully');
        
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
        NotificationManager.error(err.response.data.title);
    })
}


//action method to view all the police for admins
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


//action method to view one of the police in the requested param for admins
export const viewPolice = (id) => dispatch => {
    axios
    .get(`/api/police/view/${id}`)
    .then(res => {
        dispatch({
            type: VIEW_POLICE,
            payload: res.data
        })
    })
}


//action method to delete the police in the requested param for admins
export const deletePolice = (id) => dispatch => {
    axios
    .get(`/api/police/delete/${id}`)
    .then(res => {
        dispatch({
            type: DELETE_POLICE,
            payload: id
        })
        NotificationManager.success('Deleted Successfully!')
    })
}