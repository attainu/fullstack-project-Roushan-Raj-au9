import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import {logger} from 'redux-logger'
import MainReducer from '../reducer/MainReducer'

const Store = createStore(MainReducer,applyMiddleware(promiseMiddleware, logger))

export default Store
