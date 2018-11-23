import { jsonp, ajax } from '@ifeng/ui_base';

// 查询股票，资金，证券等数据
const login = async (type, str) => {
    return await ajax('/login', {
        cache: false,
    });
};

export { login };
