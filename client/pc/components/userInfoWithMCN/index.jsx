import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import errorBoundary from '@ifeng/errorBoundary';
import auth from '@ifeng/ui_pc_auth';
import Message from '../message';
import TiyanqiIcon from '../tiyanqiIcon';
import style from './index.css';
/**
 * 定义 Header 组件
 */
class UserInfoWidthMCN extends React.PureComponent {
    static propTypes = {
        user: PropTypes.object,
        account: PropTypes.object,
    };

    componentDidMount() {
        this.unBindLogout = auth.event.on(auth.EVENTNAMES.logout, () => {
            window.location.href = '/login';
        });
    }
    componentWillUnmount() {
        this.unBindLogout();
    }

    handleLoginOut = () => {
        auth.logout();
    };

    isTiyanqiTips = () => {
        console.log('体验期账号无法使用');
    };

    /**
     * 渲染组件
     */
    render() {
        const { user, account } = this.props;
        const isTiyanqi = account && account.isTiyanqi;

        const accountInfoDom = isTiyanqi ? (
            <li className={style.zh}>
                <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                    账号信息
                </a>
            </li>
        ) : (
            <li className={style.zh}>
                <a href="#" target="_blank" title="">
                    账号信息
                </a>
            </li>
        );

        const contentSynchDom = isTiyanqi ? (
            <li className={style.nr}>
                <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                    内容同步
                </a>
            </li>
        ) : (
            <li className={style.nr}>
                <a href="#" target="_blank" title="">
                    内容同步
                </a>
            </li>
        );

        const privilegeManageDom = isTiyanqi ? (
            <li className={style.tq}>
                <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                    特权管理
                </a>
            </li>
        ) : (
            <li className={style.tq}>
                <a href="#" target="_blank" title="">
                    特权管理
                </a>
            </li>
        );

        const infoDom = (
            <div className={style.about}>
                <div className={style.head_icon}>
                    <img src={user.weMediaImg} />
                </div>
                <div className={style.head_name}>{user.weMediaName}</div>
                <div className={style.vip}>
                    {/* 体验期审核不通过 */}
                    {account.status === 3 ? (
                        <p>
                            <a href="zsrz_sq.html" target="_blank" title="" className={style.linka}>
                                修改申请资料
                            </a>
                        </p>
                    ) : null}

                    {account.status === 1 ? (
                        <p>
                            <span className={style.linka}>正式申请审核中</span>
                        </p>
                    ) : null}

                    {/* 体验期未提交正式申请 */}
                    {account.status === 2 ? (
                        <p>
                            <a href="zsrz_sq.html" target="_blank" title="" className={style.linka}>
                                申请正式入驻
                            </a>
                        </p>
                    ) : null}

                    {!isTiyanqi ? <b>LV.{user.accountLevel}</b> : null}

                    {account.isHonor ? (
                        <span className={style.spanIcon}>
                            <img width="100%" height="100%" src={user.honorImg} />
                        </span>
                    ) : null}

                    {account.isMcnManager ? <i /> : null}
                </div>
            </div>
        );

        const honorEntrence = (
            <p className={style.dafeng}>
                <a href="#" target="_blank" title="">
                    <img src={user.honorImg} className={style.honorImg} />
                    {user.honorName}
                </a>
            </p>
        );

        const mcnEntrence = (
            <p className={style.gly}>
                <a href="#" target="_blank" title="">
                    {user.mcnInfo}
                </a>
            </p>
        );

        const hiddenDom = (
            <div className={style.xl}>
                <ul>
                    {accountInfoDom}
                    {contentSynchDom}
                    {privilegeManageDom}
                    <li className={style.tc}>
                        <a href="javascript:;" title="点击退出登录" onClick={this.handleLoginOut}>
                            退出登录
                        </a>
                    </li>
                </ul>
                <div className={style.d_f}>
                    {account.isHonor ? honorEntrence : null}
                    {account.isMcnManager ? mcnEntrence : null}
                    {/* @todo mcn成员 这里的如何显示 */}
                </div>
            </div>
        );

        return (
            <Fragment>
                <div className={style.box}>
                    {infoDom}
                    {hiddenDom}
                </div>
                <Message />
                {isTiyanqi ? <TiyanqiIcon /> : null}
            </Fragment>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    user: state.user.info,
    account: state.user.accountInfo,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(UserInfoWidthMCN));
