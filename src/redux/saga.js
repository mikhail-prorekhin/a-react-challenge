import {all} from 'redux-saga/effects'
import {saga as employeeSaga} from '../ducks/employee'
import {saga as authSaga} from '../ducks/auth'
import {saga as paymentSaga} from '../ducks/payment'

export default function * rootSaga() {
    yield all([
        employeeSaga(),
        authSaga(),
        paymentSaga()
    ])
}