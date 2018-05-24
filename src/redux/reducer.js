import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import {reducer as form} from 'redux-form'
import authReducer, {moduleName as authModule} from '../ducks/auth'
import employeeReducer, {moduleName as employeeModule} from '../ducks/employee'
import paymentReducer, {moduleName as paymentModule} from '../ducks/payment'

export default combineReducers({
    router, form,
    [authModule]: authReducer,
    [employeeModule]: employeeReducer,
    [paymentModule]: paymentReducer,
})