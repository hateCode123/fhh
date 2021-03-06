import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import user from '../common/models/user';
// import dictionary from '../common/models/dictionary';
// import login from './pages/login/models';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers({
        user,
        // dictionary,
        // login,
    }),
    composeEnhancers(applyMiddleware(thunk)),
);
