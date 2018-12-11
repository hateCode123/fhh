import { createReducers, createActions } from '../../utils';
import { combineReducers } from 'redux';
import store from '../store';

const path = name => `common:user:${name}`;

const models = {
    // 接口获取的自媒体账号的信息
    info: {
        data: {},

        handlers: {
            login(state, action) {
                console.log('actions.login', action);
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

    // 根据数据计算得出的账号状态

    accountInfo: {
        data: {},
        handlers: {
            setAccountInfo(state, action) {
                return {
                    ...action.payload,
                };
            },
            updateAccountInfo(state, action) {
                return {
                    ...state,
                    ...action.payload,
                };
            },
        },
    },

    guide: {
        data: {
            showGuide1: false,
            showGuide2: false,
        },
        handlers: {
            updateGuide(state, action) {
                return {
                    ...state,
                    ...action.payload,
                };
            },
        },
    },

    privilegeList: {
        data: {},
        handlers: {
            updatePrivilegeList(state, action) {
                return {
                    ...action.payload,
                };
            },
        },
    },

    messageNum: {
        data: 0,
        handlers: {
            updateMessageNum(state, action) {
                return action.payload;
            },
        },
    },
};

export const actions = createActions(models, path);

export default combineReducers(createReducers(models, path));
