import { request } from '../utils';

/**
 * @func  接口:获取右上角用户信息
 * @desc  接口提供的说明： //判断账号逻辑 先判断账号是否是上下线，再判断账号的审核状态
 * @desc  判断函数 ==> queryinfoHandler
 * @desc  判断优先级：从高到低 1、空对象：账号未注册 2、判断上下线 3、账号类型 4、审核状态
 *                  online 上下线状态  （0:默认 1：下线，2：上线）
 *                  accountType 账号类型（1：凤凰账号，2：签约账号，3：视频账号，4：一点账号 , 5: UGC账号 ，6:  体验账号,）
 *                  status 审核状态（1：待审核 ，2：审核通过，,3：审核未通过,4:永久审核不通过）
 *                  isMcnManager 是否是mcn管理员  2：mcn管理员；1:mcn成员；0：普通账号
 *                  honorName 荣誉体系名称  没有荣誉体系的 该字段返回空
 */

export const queryinfo = async (type, str) => {
    return await request('/napi/account/queryinfo', {
        cache: false,
    });
};
