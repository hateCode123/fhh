import { createReducers, createActions, request } from '../../utils/';
import { combineReducers } from 'redux';
// import { APIHOST } from '../../config';
import store from '../store';

const urls = {
    // getlistSensitiveDict: APIHOST + '/sensitive/admin/listSensitiveDict',
};

const path = name => `common:dictionary:${name}`;

const models = {
    // 图文分类
    artCates: {
        data: [],
        handlers: {
            artCatesGet(state, action) {
                return action.payload;
            },
        },
    },
};

export const actions = createActions(models, path);

export default combineReducers(createReducers(models, path));

// 获取分类
export const asyncGetCategory = async () => {
    try {
        let result = await request(urls.getCategory);
        // console.log('asyncGetCategory==', result);
        let catArrArticle = [];
        let catArrVideo = [];

        result.map(item => {
            switch (item.type) {
                case 1:
                    // 图文
                    catArrArticle = item.data.map(v => {
                        return {
                            label: v.c,
                            value: v.c,
                        };
                    });
                    break;
                case 2:
                    // 视频
                    catArrVideo = item.data.map(v => {
                        return {
                            label: v.c,
                            value: v.c,
                        };
                    });
                    break;
                default:
                    break;
            }
        });
        store.dispatch(
            actions.changearticleDict(
                {
                    category: catArrArticle,
                } || {},
            ),
        );
        store.dispatch(
            actions.changevideoDict(
                {
                    category: catArrVideo,
                } || {},
            ),
        );

        // 审核页使用---接口原数据
        store.dispatch(actions.artCatesGet(result.find(item => item.type + '' === '1').data || []));
        store.dispatch(actions.videoCatesGet(result.find(item => item.type + '' === '2').data || []));
    } catch (e) {
        throw e;
    }
};

// 获取所有字典
export const getAllDictionary = async () => {
    try {
        // 分类
        // await asyncGetArticleCates();
        // await asyncGetVideoCates();
        await asyncGetCategory();
    } catch (e) {
        throw e;
    }
};
