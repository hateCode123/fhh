import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import imageWen from './images/wen_index.png';

/**
 * 定义 Header 组件
 */
class TiyanqiIcon extends React.PureComponent {
    static propTypes = {
        userInfo: PropTypes.object,
        account: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { account, userInfo } = this.props;
        const isTiyanqi = account && account.isTiyanqi;

        const tiyanqiDom = (
            <div className={style.tyq}>
                体验期<img src={imageWen} />
                {/* style="bottom: -236px;" */}
                <p className={style.ts_index}>
                    <i className={style.ts_tit_index}>体验期</i>
                    <i className={style.tit_txt}>
                        用户在体验期最多只能发布3篇文章，用于体验平台对于新用户的流量扶持，了解基本的发文流程。
                    </i>
                    <i className={style.tit_txt}>
                        申请正式入驻，完善个人信息并通过审核，即可成为正式的个人帐号主，不再收到发文篇数的限制。
                    </i>
                    <i className={style.tit_txt}>
                        当前剩余体验文章数：<b>{userInfo.remainingPubNum}</b>/3
                    </i>
                </p>
                <span className={style.sj_d} />
            </div>
        );

        const weitongguoDom = (
            <div className={style.tyq}>
                正式入驻申请未通过<img src={imageWen} />
                <p className={style.ts_index}>
                    <i className={style.ts_tit_index}>正式入驻申请未通过</i>
                    <i className={style.tit_txt}>非常感谢您申请凤凰号， 我们很抱歉地通知您的申请未能通过审核。</i>
                    <i className={style.tit_txt}>
                        原因如下：{userInfo.auditReason || '请联系管理员获取'} ，请您修改后再次提交。
                    </i>
                    <i className={style.tit_txt}>仍有问题，请联系邮箱:&nbsp; zmt@ifeng.com</i>
                    <b className={style.btn_index}>
                        <a href="zsrz_sq.html" target="_blank" rel={rel} title="">
                            {' '}
                            修改申请资料
                        </a>
                    </b>
                    <i className={style.tit_txt}>
                        当前剩余体验文章数：<b>{userInfo.remainingPubNum}</b>/3
                    </i>
                </p>
                <span className={style.sj_d} />
            </div>
        );

        return isTiyanqi && account.status === 3 ? weitongguoDom : tiyanqiDom;
    }
}

// export default Container;
const mapStateToProps = state => ({
    userInfo: state.user.info,
    account: state.user.accountInfo,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(TiyanqiIcon));
