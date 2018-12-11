exports.login = {
    path: '/stat/index',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('stat_index', {});
    },
};
