/**
 * @func 根据接口请求数据，计算出账号状态，格式和接口返回一直，code和接口提供规则一致
 *
 * @todo  开发时先通过改变code  实现不同账号状态切换
 */

import store from '../common/store';
import { actions } from '../common/models/user';

export const checkAccountStatus = sourceData => {
    // @todo: 数据正确就把这的计算结果存储到localstorage和store里面

    console.log('sourceData ', sourceData);

    store.dispatch(actions.login(sourceData));

    return {
        code: 200,
        data: sourceData.data,
        message: '',
    };
};
