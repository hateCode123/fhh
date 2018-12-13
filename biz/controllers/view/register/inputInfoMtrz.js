exports.login = {
    path: '/register/inputInfoMtrz',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('register_inputInfoMtrz', {});
    },
};
