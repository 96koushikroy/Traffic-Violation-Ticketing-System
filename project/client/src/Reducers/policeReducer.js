import {ADD_POLICE, GET_ALL_POLICE, VIEW_POLICE, DELETE_POLICE} from '../Actions/actionType'

const initState = {
    name:'',
    email:'',
    password:'',
    polices: [],
    police: null
}

const policeReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_POLICE:
            let dd = state.polices
            dd.push(action.payload)
            return{
                ...state,
                polices: dd
            }  
        case GET_ALL_POLICE:
            return{
                ...state,
                polices: action.payload
            }
        case VIEW_POLICE:
            return{
                ...state,
                police: action.payload
            }
        case DELETE_POLICE:
            let ss = state.polices.filter(police => police.id != action.payload);
            return{
                ...state,
                polices: ss
            }
        
        default: 
             return state
    }
}

export default policeReducer
