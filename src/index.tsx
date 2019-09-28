// import './index.scss'
//
import * as React from 'react';
import { render } from 'react-dom';
import { Router } from "react-router";
import { Provider } from 'react-redux';
import { renderRoutes } from "react-router-config";
import { createBrowserHistory } from "history";
//
import App from '@modules/App';
App();
//
import configureStore from "@core/store";
import RouteContainer from "@core/containers/RouteContainer";


const store = configureStore();
const routes = RouteContainer.new.getRoutes();

render(
    <Provider store={store}>
        <Router history={createBrowserHistory()}>
            {renderRoutes(routes)}
        </Router>
    </Provider>,
    document.getElementById('app')
);
