exports.login = {
    path: '/(index)?',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('index', {});
    },
};
