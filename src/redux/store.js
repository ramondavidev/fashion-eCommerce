import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';

import rootReducer from './root-reducer';

//pulling a function from redux and putting in an array
const middlewares = [logger];

//applyMiddleware will spread all the methods or values of the array as individual arguments
const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;