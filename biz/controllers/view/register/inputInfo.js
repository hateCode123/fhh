exports.login = {
    path: '/register/inputInfo',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('register_inputInfo', {});
    },
};
