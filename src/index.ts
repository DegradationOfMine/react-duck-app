import '@babel/polyfill';
//
import * as  React from 'react'
import {render} from 'react-dom';
import { Router } from "react-router";
import { Provider } from 'react-redux';
import createBrowserHistory from "history/createBrowserHistory";
//
import routes from "./modules/App/routes";
import configureStore from "./modules/App/store";
//
import './index.scss'
const store = configureStore();

render(
<Provider store={store}>
        <Router history={createBrowserHistory()}>
            {renderRoutes(routes)}
        </Router>
    </Provider>,
    document.getElementById('app')
);
