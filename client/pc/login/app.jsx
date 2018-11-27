import '@babel/polyfill';
import 'raf/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../common/store';

import './reset.css';
import Layout from './layout/';

ReactDOM.render(
    <Provider store={store}>
        <Layout />
    </Provider>,
    document.getElementById('root'),
);

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
