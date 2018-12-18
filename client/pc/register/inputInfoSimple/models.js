import { createReducers, createActions, request } from '../../utils/';
import { combineReducers } from 'redux';
// import { APIHOST } from '../../config';
// import { getUrlParams } from './utils';
const LOCATIONIP = 'http://test0.fhh.ifeng.com';
const apiInterfaceHost = `${LOCATIONIP}/napi`;
const APIHOST = apiInterfaceHost;

const urls = {
    queryUsernameKeywords: `${APIHOST}/pc/account/checkIllegalName`, // 验证关键字
    checkPhoneNum: `${APIHOST}/pc/check/tel`, // 校验手机号
    getSms: `${APIHOST}/send/sms`, // 获取验证码
    register: `${LOCATIONIP}/api/account/experience/register`, // 注册接口
};
const path = name => `register:inputInfoSimple:${name}`;

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

    // 头像
    weMediaImg: {
        data: '',
        handlers: {
            changeWeMediaImg(state, action) {
                return action.payload;
            },
        },
    },

    // 注册状态
    registerStatus: {
        data: '',
        handlers: {
            changeRegsiterStatus(state, action) {
                return action.payload;
            },
        },
    },

    // 注册失败的信息
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
            // const result =  await request(urls.queryUsernameKeywords, {data:{userName}, type:'get'})
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
            const operatorTelephone = str;
            // const result = await request(urls.checkPhoneNum, {data: operatorTelephone }, type:'get'});
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
        const operatorTelephone = str;
        // const res = await request(urls.getSms, {data: {operatorTelephone}});
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
    const registerValuesObj = getState().inputInfoSimple.registerValues;

    const postParams = {};

    postParams.weMediaType = '1';

    const profilePhoto = getState().inputInfoSimple.weMediaImg;

    console.log(profilePhoto);

    postParams.weMediaImg = profilePhoto;
    postParams.weMediaName = registerValuesObj.weMediaName;
    postParams.operatorTelephone = registerValuesObj.operatorTelephone;
    if (registerValuesObj.validateCode) {
        postParams.validateCode = registerValuesObj.validateCode;
    }

    return postParams;
};

// 点击注册功能
export const asyncRegister = () => {
    return async (dispatch, getState) => {
        try {
            if (getState().inputInfoSimple.registerValues.agree) {
                let result = {
                    data: null,
                    status: 'success',
                    code: 1000,
                    message: '自媒体名称已经存在',
                };
                let params = getRegisterParams(getState);

                console.log(params);
                // const result = await request(urls.register, { data: params, type: 'post' });

                if (result.code === 1000) {
                    console.log('注册成功');
                    dispatch(actions.changeRegsiterStatus('success'));
                } else {
                    console.log('error');
                    dispatch(actions.changeRegsiterStatus('error'));

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
