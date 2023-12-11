import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../src/reducers/authReducer.js'

export default configureStore({
    reducer: authReducer,

})
