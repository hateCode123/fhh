exports.login = {
    path: '/register/inputInfoSimple',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('register_inputInfoSimple', {});
    },
};
