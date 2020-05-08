import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//allow us to get access to all the things related to the store that are gonna put our actual code we wanna
//store on redux data
import { Provider } from 'react-redux';

import store from './redux/store';

import './index.css';
import App from './App';


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

