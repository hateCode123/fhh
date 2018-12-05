import { request } from '../utils';

/**
 * @func  接口:获取未读消息数量
 */
//
export const getNoReadCount = async (type, str) => {
    return await request('/api/message/getNoReadCount', {
        cache: false,
    });
};
