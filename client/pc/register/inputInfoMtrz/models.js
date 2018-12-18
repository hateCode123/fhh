import { createReducers, createActions, request } from '../../utils/';
import { combineReducers } from 'redux';
// import { APIHOST } from '../../config';
// import { getUrlParams } from './utils';
const LOCATIONIP = 'http://test0.fhh.ifeng.com';
const apiInterfaceHost = `${LOCATIONIP}/napi`;
const APIHOST = apiInterfaceHost;

const urls = {
    getChannel: `${APIHOST}/category/findList`, // 获取专注领域
    queryUsernameKeywords: `${APIHOST}/pc/account/checkIllegalName`, // 验证关键字
    getLocation: `${APIHOST}/account/addressByIp`, // 获取用户地址
    checkPhoneNum: `${APIHOST}/pc/check/tel`, // 校验手机号
    getSms: `${APIHOST}/send/sms`, // 获取验证码
    register: `${LOCATIONIP}/api/account/register`, // 注册接口
};
const path = name => `register:inputInfoMtrz:${name}`;

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

    // 专注领域
    categoryIdOption: {
        data: [],
        handlers: {
            changeCategoryIdOption(state, action) {
                return action.payload;
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

// 获取专注领域
export const asyncGetChannel = () => {
    return async (dispatch, getState) => {
        try {
            const params = {
                level: 1,
                type: 1,
            };
            // const result = await request(urls.getChannel, { data: params, type: 'get' });
            const result = await {
                success: true,
                data: {
                    rows: [
                        {
                            name: '凤凰',
                            id: '5854cc129cd31025a647acc4',
                        },
                        {
                            name: '百科',
                            id: '5854cc129cd31025a647acb1',
                        },
                        {
                            name: '争鸣',
                            id: '5854cc129cd31025a647accc',
                        },
                        {
                            name: '时政',
                            id: '5858d867afbea52c129b4773',
                        },
                        {
                            name: '国际',
                            id: '5854cc129cd31025a647acb6',
                        },
                    ],
                },
                status: 'success',
                code: 1000,
                message: '',
            };
            let data = '';

            // console.log('获取频道');
            if (result.code === 1000) {
                data = result.data.rows;
            }
            // console.log(data);

            let channelOptions = [];

            data.map(item => {
                let obj = {};

                obj.label = item.name;
                obj.value = item.id;
                channelOptions.push(obj);

                return true;
            });
            // console.log(channelOptions);
            dispatch(actions.changeCategoryIdOption(channelOptions));

            return result;
        } catch (e) {
            throw e;
        }
    };
};

// 查询大凤号名关键词
export const asyncQueryKeywords = str => {
    return async (dispatch, getState) => {
        await console.log(str);

        if (str) {
            const userName = str;
            // const result = await request(urls.queryUsernameKeywords, {data:{userName}, type:'post'})
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
            // const result = await request(urls.queryUsernameKeywords, {data:{userName}, type:'get'})
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
    const registerValuesObj = getState().inputInfoMtrz.registerValues;

    const postParams = { ...registerValuesObj };

    delete postParams.agree;

    postParams.weMediaType = '2';
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

            if (getState().inputInfoMtrz.registerValues.agree) {
                const params = getRegisterParams(getState);

                console.log(params);
                // const result = await request(urls.register, { data: params, type: 'post' });

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
