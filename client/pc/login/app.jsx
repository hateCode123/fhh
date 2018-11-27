import '@babel/polyfill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../common/store';

import auth from '@ifeng/ui_pc_auth';

import './reset.css';
import Layout from './layout/';

const isLogin = auth.isLogin();

if (!isLogin) {
    ReactDOM.render(
        <Provider store={store}>
            <Layout />
        </Provider>,
        document.getElementById('root'),
    );
} else {
    window.location.href = '/index';
}

// /* eslint-disable no-undef */
// ReactDOM.render(
//     <div>
//         <h1>login</h1>
//         <input />
//         <input />
//     </div>,
//     document.getElementById('root'),
// );
// /* eslint-enable no-undef */
