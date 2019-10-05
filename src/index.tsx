import './index.scss'
//
import * as React from 'react';
import { render } from 'react-dom';
import { Router } from "react-router";
import { Provider } from 'react-redux';
import { createBrowserHistory } from "history";
import { renderRoutes } from "react-router-config";
//
import "./bootstrap";
//
import store from "@core/store";
import routes from "@core/containers/RouteContainer";

render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            {renderRoutes(routes.all())}
        </Router>
    </Provider>,
    document.getElementById('app')
);
