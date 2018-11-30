import { request } from '../utils';

/**
 * @func  接口:查询权限列表
 * @desc  接口提供的说明：1.原创 2.原创保护 3.插入商品 4. 插入链接功能 5.流量+ 6.评论功能 7 双标题/双封面 8.正版图库 9外图封面 10.MCN管理  11.荣誉体系管理
示例：{
            code: 1000,
            success: true,
            data: {
                rows: [3, 1, 6, 7, 9, 2, 5, 8, 4, 10, 11],
            },
        };
        
*/
//
export const privilegeListOpened = async (type, str) => {
    return await request('/api/account/privilegeListOpened', {
        cache: false,
    });
};
