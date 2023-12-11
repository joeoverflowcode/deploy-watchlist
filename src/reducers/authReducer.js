import axios from 'axios'

let {data} = await axios.get('/api/auth/status')


//defines initial state
const initialAuthState = {
    loggedIn: data.loggedIn
}



export default function authReducer (state = initialAuthState, action) {
    switch(action.type) {
        case "login":
            return {
                ...state,
                loggedIn: true,
            }
        case 'logout':
            return {
                ...state,
                 loggedIn: false, 
                }
        default:
            return state
        }   
}