exports.login = {
    path: '/signup/chooseType',
    method: 'get',
    type: 'html',
    online: true,
    handler: async ctx => {
        await ctx.html('signup_chooseType', {});
    },
};
