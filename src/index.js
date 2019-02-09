import '@babel/polyfill';
//
import React from 'react'
import ReactDOM from 'react-dom';
import { Router } from "react-router";
import createBrowserHistory from "history/createBrowserHistory";
import { renderRoutes } from "react-router-config";
//
import routes from "./core/routes";
//
import './index.scss'

ReactDOM.render(
    <Router history={createBrowserHistory()}>
        {renderRoutes(routes)}
    </Router>,
    document.getElementById('app')
);
