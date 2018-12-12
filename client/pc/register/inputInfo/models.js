import { createReducers, createActions, request } from '../../utils/';
import { combineReducers } from 'redux';
// import { APIHOST } from '../../config';
// import { getUrlParams } from './utils';

const urls = {
    queryUsernameKeywords: '/napi/pc/account/checkIllegalName',
    // queryCommentLog: '/log/comment/query', // 查询
};
const path = name => `register:inputInfo:${name}`;

const models = {
    // 注册信息
    registerValues: {
        data: {},
        handlers: {
            changeRegisterValues(state, action) {
                console.log('changeSearchValues');

                return action.payload;
            },
        },
    },

    // 页面状态参数
    uiStatus: {
        data: {
            isLoading: false,
            phoneErros: false,
            isCountdown: false,
            isTipsModalShow: false,
        },
        handlers: {
            changeUiStatus(state, action) {
                return { ...state, ...action.payload };
            },
        },
    },
    // 过滤选项--所有列表
};

export const actions = createActions(models, path);

export default combineReducers(createReducers(models, path));

const formateDateTime = arr => {
    return {
        startTime: arr[0].format('YYYY-MM-DD HH:mm:ss'),
        endTime: arr[1].format('YYYY-MM-DD HH:mm:ss'),
    };
};

// 查询大凤号名关键词
export const asyncQueryKeywords = str => {
    return async (dispatch, getState) => {
        await console.log(str);

        if (str) {
            const userName = str;
            // await request(urls.queryUsernameKeywords, {data:{userName}, type:'string'})
            const result = {
                data: {
                    isIllegal: false,
                },
                status: 'success',
                code: 1001,
                message: '',
            };
            let errorMsg = '';

            if (result.code === 1000) {
                if (!result.data.isIllegal) {
                    errorMsg = '您输入的名称中含有敏感词';
                }

                return errorMsg;
            } else {
                return null;
            }
        }
    };
};
// 查询手机号是否注册
export const asyncQueryPhoneNum = str => {
    return async (dispatch, getState) => {
        await console.log(str);

        if (str) {
            const phoneNum = str;
            // await request(urls.queryUsernameKeywords, {data:{userName}, type:'string'})
            const result = {
                data: {
                    isExist: false,
                },
                status: 'success',
                code: 1000,
                message: '',
            };
            let errorMsg = '';

            if (result.code === 1000) {
                if (!result.data.isExist) {
                    errorMsg = '该手机号已被注册';
                }

                return errorMsg;
            } else {
                return null;
            }
        }
    };
};

// 获取验证码
export const asyncGetValidateCode = str => {
    return (dispatch, getState) => {
        console.log('获取验证码');
        console.log(str);
        const res1 = {
            data: {
                isExist: true,
            },
            status: 'success',
            code: 1000,
            message: '',
        };
        const res2 = {
            data: null,
            status: 'success',
            code: 2002,
            message: '手机号不合法',
        };
        let errorMsg = '';

        if (res2.code === 2002) {
            errorMsg = res2.message;

            return errorMsg;
        }
    };
};

const getRegisterParams = getState => {
    const registerValuesObj = getState().inputInfo.registerValues;

    const postParams = {};

    postParams.weMediaType = '1';
    postParams.weMediaImg =
        'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/e8c22a3022cd7dbsize25_w200_h200.jpg';
    postParams.weMediaName = registerValuesObj.weMediaName;
    postParams.weMediaName = registerValuesObj.operatorTelephone;
    if (registerValuesObj.validateCode) {
        postParams.weMediaName = registerValuesObj.validateCode;
    }
};

export const asyncRegister = () => {
    return async (dispatch, getState) => {
        console.log(getState());
        getRegisterParams(getState);
        // let result =
        if (getState().inputInfo.registerValues.agree) {
            dispatch(
                actions.changeUiStatus({
                    isTipsModalShow: true,
                }),
            );
        }
    };
};

// 获取列表---参数
// const generateParams = getState => {
//     let getParams = {};
//     let state = getState().commentCheckLog;

//     getParams.pagination = state.pagination; // 分页
//     getParams.sort = { key: 'auditTime', type: 'desc' }; // 排序
//     getParams.query = state.searchValues;

//     // 地址参数----单个日志
//     const logId = getUrlParams(window.location.search).id || null;
//     if (logId) {
//         getParams.query.domain = logId;
//     }

//     // 日期
//     let createTime =
//         getParams.query.createTime && getParams.query.createTime.length
//             ? formateDateTime(getParams.query.createTime)
//             : null;
//     if (createTime) {
//         getParams.query.startTime = createTime.startTime;
//         getParams.query.endTime = createTime.endTime;
//     }
//     getParams.query.createTime && delete getParams.query.createTime; // 去除

//     // 如果为全部则不用传递此参数
//     getParams.filter = {};
//     if (state.filterData.length !== state.actionList.length) {
//         getParams.filter = { auditorStatus: state.filterData }; // 过滤项
//     }

//     return getParams;
// };

// 异步获取列表数据
// export const asyncGet = () => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(actions.changeUiStatus({ isLoading: true }));

//             let getParams = generateParams(getState);
//             console.log('get--getparams-', getParams);
//             let result = await request(urls.queryCommentLog, 'post', getParams);
//             // console.log('total--',result.pagination.total);
//             await dispatch(actions.changePagination({ total: result.pagination.total }));

//             // 列表加索引
//             result.list.forEach((item, index) => {
//                 item.key = index + 1;
//             });
//             await dispatch(actions.get(result.list));
//         } catch (e) {
//             throw e;
//         } finally {
//             dispatch(actions.changeUiStatus({ isLoading: false }));
//         }
//     };
// };

// /**
//  * 获取操作类型
//  */
// export const asyncGetActions = () => {
//     return async (dispatch, getState) => {
//         try {
//             // let result = await request(urls.queryCommentDomain, 'post', getParams);
//             let result = [
//                 {
//                     label: '通过',
//                     value: 132,
//                 },
//                 {
//                     label: '删除',
//                     value: 68,
//                 },
//                 {
//                     label: '置顶',
//                     value: 10001,
//                 },
//                 {
//                     label: '取消置顶',
//                     value: 10000,
//                 },
//             ];
//             await dispatch(actions.updateActionList(result));
//         } catch (e) {
//             throw e;
//         } finally {
//         }
//     };
// };
