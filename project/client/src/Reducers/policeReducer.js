import {ADD_POLICE} from '../Actions/actionType'

const initState = {
    name:'',
    email:'',
    password:'',
    polices: []
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
        default: 
             return state
    }
}

export default policeReducer
