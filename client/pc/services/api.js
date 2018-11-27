import { request } from '../utils/';

// 接口: 名称关键字校验
export const userLogin = async (type, str) => {
    return await request('/napi/account/queryinfo', {
        cache: false,
    });
};
