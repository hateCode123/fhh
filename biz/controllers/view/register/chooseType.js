exports.login = {
    path: '/register/chooseType',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('register_chooseType', {});
    },
};
