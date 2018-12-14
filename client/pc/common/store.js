import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import user from '../common/models/user';
import inputInfoSimple from '../../pc/register/inputInfoSimple/models';
import inputInfo from '../../pc/register/inputInfo/models';
import inputInfoMtrz from '../../pc/register/inputInfoMtrz/models';
import inputInfoQtrz from '../../pc/register/inputInfoQtrz/models';
// import dictionary from '../common/models/dictionary';
// import login from './pages/login/models';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
    combineReducers({
        user,
        inputInfoSimple,
        inputInfo,
        inputInfoMtrz,
        inputInfoQtrz,
        // dictionary,
        // login,
    }),
    composeEnhancers(applyMiddleware(thunk)),
);
