/**
 * @func 根据接口数据，判断用户账号状态，处理后续逻辑
 * @desc 状态1、未注册账号，跳转到选择类型页面 chooseType
 * @desc 状态2、个人极速入驻成功，未提交正式申请，跳转体验期页面引导填写正式申请
 * @desc 状态3、个人极速入驻成功，已提交正式申请，审核中状态，跳转体验期页面
 * @desc 状态4、个人极速入驻成功，已提交正式申请，审核未通过，跳转引导修改体验期页面
 * @desc 状态5、正式入驻，审核中，跳转等待审核页面
 * @desc 状态6、正式入驻，审核未通过，跳转反馈审核原因页面
 * @desc 状态7、审核通过，跳转首页
 * @desc 状态8、下线
 */
import { dealAccountStatus, checkAccountStatus } from './index';
import { queryinfo } from '../services/';

export const getAccountStatus = async () => {
    try {
        console.log('getAccountStatus');

        // const accountInfo = await queryinfo();

        const accountInfo = {
            weMediaId: '58576cb2951f464ba7828d01',
            eAccountId: 370804,
            weMediaName: '苹果冬瓜茄子',
            weMediaImg:
                'http://d.ifengimg.com/q100/img1.ugc.ifeng.com/newugc/20180730/16/wemedia/e80ed7b4e871e0de9085ca727283460e24e0241c_size59_w200_h200.png',
            fhtId: '76916822',
            status: '1',
            accountLevel: '12',
            systemOfflineReason: '',
            accountType: '1',
            remainingPubNum: '0',
            mcnInfo: '苹果冬瓜茄子MCN组织管理员',
            subId: '370804',
            mcnId: '370804',
            mcnName: '苹果冬瓜茄子',
            isMcnManager: '2',
            honorName: '大风号荣誉主笔',
            honorImg: 'http://p0.ifengimg.com/a/2018/0929/8c6f0f95dd440aesize5_w54_h54.png',
        };

        const status = checkAccountStatus(accountInfo);

        return dealAccountStatus(status);
    } catch (e) {
        console.error(e);

        throw new Error(e);
    }
};
