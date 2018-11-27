import {
    request
} from '../utils';

// 接口: 获取右上角用户信息
export const userLogin = async (type, str) => {
    return await request('/napi/account/userLogin', {
        cache: false,
    });
};
