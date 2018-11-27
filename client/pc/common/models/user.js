import {
    createReducers,
    createActions,
    request,
    sleep
} from '../../utils';
import {
    combineReducers
} from 'redux';
// import { APIHOST } from '../../config';
// import { message } from 'antd';
import store from '../store';

const urls = {
    // userOffline: APIHOST + '/logic/user/offline',
    // login: APIHOST + '/login-server/login',
    // getRoles: APIHOST + '/auth-server/userInfo',
};

const path = name => `common:user:${name}`;

const guestInfo = {
    // id: 'guest',
    // user_name: 'guest',
    // name: '游客',
    // phone: '',
    // email: '',
    // token: 'test',
    roles: ['guest'],
};

const models = {
    info: {
        data: guestInfo,
        handlers: {
            login(state, action) {
                sessionStorage.setItem('__tokenIFengCheckSys', action.payload.access_token);

                return { ...state,
                    token: action.payload.access_token
                };

            },
            getRoles(state, action) {
                let zone = action.payload.role.map((v, i) => {
                    return v.substring(6);
                });
                let roles = action.payload.role;
                let resultRoles = [...state.roles];
                if (roles && roles.length > 0) {
                    resultRoles = [...roles];
                } else {
                    resultRoles = [...state.roles, ...roles];
                }
                // todo  模拟数据 模拟不同身份登录
                // super
                // let roles = ['picus_super']
                // super + 一个管理员
                // let roles = ['picus_super','picus_art_ma']
                // super + 一个审核员
                // let roles = ['picus_super','picus_zmt_art_low']
                // 一个管理员
                // let roles = ['picus_art_ma']
                // 一个管理员+ 一个审核员
                // let roles = ['picus_art_ma', 'picus_zmt_art_low']
                // 一个管理员
                // let roles = ['picus_vid_ma']
                // 一个管理员+ 一个审核员
                // let roles = ['picus_vid_ma', 'picus_zmt_art_low'];
                // 一个管理员+ 多个审核员
                // let roles = [
                //     'picus_art_ma',
                //     'picus_zmt_art_low',
                //     'picus_zmt_art_high',
                //     'picus_zz_art_low',
                //     'picus_com_dangerous',
                //     'picus_zz_vid_qua',
                // ];
                // 多个管理员+ 多个审核员
                // let roles = [
                //     'picus_art_ma',
                //     'picus_vid_ma',
                //     'picus_zmt_art_low',
                //     'picus_zmt_art_high',
                //     'picus_zz_art_low',
                //     'picus_com_dangerous',
                //     'picus_zz_vid_qua',
                // ];
                // super + 多个管理员+ 多个审核员
                // let roles = [
                //     'picus_super',
                //     'picus_art_ma',
                //     'picus_vid_ma',
                //     'picus_zmt_art_low',
                //     'picus_zmt_art_high',
                //     'picus_zz_art_low',
                //     'picus_com_dangerous',
                //     'picus_zz_vid_qua',
                // ];
                // super + 多个审核员
                // let roles = [
                //     'picus_super',

                //     'picus_zmt_art_low',
                //     'picus_zmt_art_high',
                //     'picus_zz_art_low',
                //     'picus_com_dangerous',
                //     'picus_zz_vid_qua',
                // ];
                return { ...state,
                    roles: resultRoles,
                    name: action.payload.username,
                    userZoneAll: zone
                };
            },
            logout() {
                sessionStorage.removeItem('__tokenIFengCheckSys');
                return { ...guestInfo
                };
            },
        },
    },
};

export const actions = createActions(models, path);

export default combineReducers(createReducers(models, path));

// // 获取用户角色
// export const asyncGetUserRoles = async () => {
//     try {
//         let result = await request(urls.getRoles);
//         store.dispatch(actions.getRoles(result));
//     } catch (e) {
//         throw e;
//     } finally {
//     }
// };
// // 表单信息登录
// export const asyncLogin = async (name, pwd) => {
//     try {
//         let params = { username: name, password: pwd };
//         let result = await request(urls.login, 'post', params);
//         await store.dispatch(actions.login(result));
//         await asyncGetUserRoles();
//     } catch (e) {
//         throw e;
//     } finally {
//     }
// };
// export const asyncUpdateStoreUserInfo = result => {
//     return async (dispatch, getState) => {
//         try {
//             await store.dispatch(actions.login(result));
//         } catch (e) {
//             throw e;
//         } finally {
//         }
//     };
// };

// export const asyncLogout = () => {
//     return async (dispatch, getState) => {
//         try {
//             await request(urls.userOffline);
//             dispatch(actions.logout());
//         } catch (e) {
//             sessionStorage.removeItem('__tokenIFengCheckSys');
//             window.location.href = APIHOST + '/user/internal/login';
//             throw e;
//         } finally {
//         }
//     };
// };

// export const logout = async () => {
//     try {
//         await request(urls.userOffline);
//         await store.dispatch(actions.logout());
//     } catch (e) {
//         throw e;
//     } finally {
//     }
// };

// export const logoutWithoutOffline = async () => {
//     try {
//         await store.dispatch(actions.logout());
//         message.info('用户名或密码错误，登录失败');
//         setTimeout(() => {
//             window.location.reload();
//         }, 1000);
//     } catch (e) {
//         throw e;
//     } finally {
//     }
// };
