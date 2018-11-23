exports.login = {
    path: '/login',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('login_index', {});
    },
};
