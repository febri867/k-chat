import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import initStore from './Store';
import 'bootstrap/scss/bootstrap.scss';
import './Styles/_index.scss';
import App from './App/index';

ReactDOM.render(
    <Provider store={initStore()}>
        <App />
    </Provider>,

    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
