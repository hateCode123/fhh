import '@babel/polyfill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../common/store';

import './reset.css';
import Layout from './layout/';

import auth from '@ifeng/ui_pc_auth';

const isLogin = auth.isLogin();

if (isLogin) {
    ReactDOM.render(
        <Provider store={store}>
            <Layout />
        </Provider>,
        document.getElementById('root'),
        // document.getElementsByTagName('body')[0],
    );
} else {
    window.location.href = `/login?url=${window.location.href}`;
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
