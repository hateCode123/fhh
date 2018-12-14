exports.login = {
    path: '/register/inputInfoQtrz',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('register_inputInfoQtrz', {});
    },
};
