const { getCommentCount } = require('./api');

/**
 * 获取评论数
 * @param {Array} data 数组数据
 */
export const getCommentNum = async data => {
    const urlArr = [];

    data.forEach(each => urlArr.push(each.commentUrl));

    const getComments = await getCommentCount(urlArr);

    data.forEach(originData => {
        getComments.forEach(res => {
            if (originData.commentUrl === res.doc_url) {
                originData.commentsNum = res.count;
            }
        });
        originData.commentUrl = `http://gentie.ifeng.com/view.html?docName=${originData.title}&docUrl=${
            originData.commentUrl
        }&skey=${originData.skey}&pcUrl=${originData.url}`;
    });

    return data;
};
