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

    // 提交是否成功
    registerStatus: {
        data: '',
        handlers: {
            changeRegisterStatus(state, action) {
                return action.payload;
            },
        },
    },

    // 错误提示
    errorMessage: {
        data: '',
        handlers: {
            changeErrorMessage(state, action) {
                return action.payload;
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
    const postParams = { ...registerValuesObj };

    delete postParams.agree;

    postParams.weMediaType = '1';
    postParams.weMediaImg =
        'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/e8c22a3022cd7dbsize25_w200_h200.jpg';

    return postParams;
};

// 点击注册功能
export const asyncRegister = () => {
    return async (dispatch, getState) => {
        try {
            console.log(getState());

            let result = await {
                data: null,
                status: 'success',
                code: 1000,
                message: '自媒体名称已经存在111',
            };

            if (getState().inputInfo.registerValues.agree) {
                const params = getRegisterParams(getState);

                console.log(params);
                if (result.code === 1000) {
                    console.log('注册成功');
                    dispatch(actions.changeRegisterStatus('success'));
                } else {
                    console.log('注册失败');
                    dispatch(actions.changeRegisterStatus('error'));

                    dispatch(actions.changeErrorMessage(result.message));
                }
            }
        } catch (e) {
            throw e;
        } finally {
            dispatch(
                actions.changeUiStatus({
                    isTipsModalShow: true,
                }),
            );
        }
    };
};
