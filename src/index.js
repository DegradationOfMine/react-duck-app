import '@babel/polyfill';
//
import React from 'react'
import ReactDOM from 'react-dom';
import { Router } from "react-router";
import { Provider } from 'react-redux';
import { renderRoutes } from "react-router-config";
import createBrowserHistory from "history/createBrowserHistory";
//
import routes from "./modules/App/routes";
import configureStore from "./modules/App/store";
//
import './index.scss'
const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <div>test</div>
        <Router history={createBrowserHistory()}>
            {renderRoutes(routes)}
        </Router>
    </Provider>,
    document.getElementById('app')
);
