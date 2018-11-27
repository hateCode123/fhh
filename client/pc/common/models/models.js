import { createReducers, createActions, request } from '../../utils/';
import { combineReducers } from 'redux';
// import { APIHOST } from '../../config';
import { getUrlParams } from './utils';

const urls = {
    queryCommentLog: '/log/comment/query', // 查询
};
const path = name => `app/pages/commentCheckLog/${name}`;

const models = {
    // 列表数据
    list: {
        data: [],
        handlers: {
            // get(state, action) {
            //     return action.payload;
            // },
            // changeListData(state, action) {
            //     return state.map(item => {
            //         if (item.reasonId === action.payload.reasonId) {
            //             item.status = action.payload.status;
            //         }
            //         return item;
            //     });
            // },
        },
    },
    // 分页数据
    pagination: {
        data: {
            current: 1,
            total: '',
            pageSize: 20,
        },
        handlers: {
            changePagination(state, action) {
                return { ...state, ...action.payload };
            },
        },
    },
    // 搜索列表数据的filter表单
    searchValues: {
        data: {},
        handlers: {
            changeSearchValues(state, action) {
                return action.payload;
            },
        },
    },
    // 筛选项
    filterData: {
        data: [],
        handlers: {
            changefilterData(state, action) {
                return action.payload;
            },
        },
    },
    // 页面状态参数
    uiStatus: {
        data: {
            isLoading: false,
        },
        handlers: {
            changeUiStatus(state, action) {
                return { ...state, ...action.payload };
            },
        },
    },
    // 过滤选项--所有列表
    actionList: {
        data: [],
        handlers: {
            updateActionList(state, action) {
                return action.payload;
            },
        },
    },
};

export const actions = createActions(models, path);

export default combineReducers(createReducers(models, path));

const formateDateTime = arr => {
    return {
        startTime: arr[0].format('YYYY-MM-DD HH:mm:ss'),
        endTime: arr[1].format('YYYY-MM-DD HH:mm:ss'),
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
