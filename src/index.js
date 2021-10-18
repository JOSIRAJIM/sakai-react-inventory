import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';

import { DirectusProvider } from './DirectusProvider';

import Store from './store'
ReactDOM.render(
    <BrowserRouter>
    <Switch>
        <ScrollToTop>
            <Store>
           <DirectusProvider apiUrl="http://localhost:8055/">
                <App></App>
            </DirectusProvider>

            </Store>
        </ScrollToTop>
    </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();