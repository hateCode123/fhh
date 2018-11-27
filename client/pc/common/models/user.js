import { createReducers, createActions, request, sleep } from '../../utils';
import { combineReducers } from 'redux';
import store from '../store';

const urls = {
    // userOffline: APIHOST + '/logic/user/offline',
    // login: APIHOST + '/login-server/login',
    // getRoles: APIHOST + '/auth-server/userInfo',
};

const path = name => `common:user:${name}`;

const models = {
    info: {
        data: {},
        handlers: {
            login(state, action) {
                // localStorage.setItem('__tokenIFengCheckSys', action.payload.access_token);

                return {
                    ...action.payload,
                    // token: action.payload.access_token,
                };
            },

            updateUserInfo(state, action) {
                // localStorage.setItem('__tokenIFengCheckSys', action.payload.access_token);

                return {
                    ...state,
                    ...action.payload,
                };
            },

            logout() {
                // sessionStorage.removeItem('__tokenIFengCheckSys');

                return {};
            },
        },
    },
    accountInfo: {
        data: {},
        handlers: {
            updateAccountInfo(state, action) {
                // localStorage.setItem('__tokenIFengCheckSys', action.payload.access_token);

                return {
                    ...state,
                    ...action.payload,
                    // token: action.payload.access_token,
                };
            },
        },
    },
};

export const actions = createActions(models, path);

export default combineReducers(createReducers(models, path));
