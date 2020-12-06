import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router} from 'react-router-dom';
import Parse from "parse";

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
    'LZLxqqmf8QrOsF2rSZcmXr71VCM6h6YDBeIAvQnN', // This is your Application ID
    'DN4sDSO2hjOyYfGNa0tlOPB7DGl7T6tgrzg2A1BB' // This is your Javascript key
);
ReactDOM.render(<Router basename={process.env.PUBLIC_URL}><App /></Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
