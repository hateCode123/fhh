import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';
import auth from '@ifeng/ui_pc_auth';

import style from './index.css';
import imageXin from './images/xin.png';
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

    /**
     * 渲染组件
     */
    render() {
        const { user, account } = this.props;

        const infoDom = (
            <div className={style.about}>
                <div className={style.head_icon}>
                    <img src={user.weMediaImg} />
                </div>
                <div className={style.head_name}>{user.weMediaName}</div>
                <div className={style.vip}>
                    <b>LV.{user.accountLevel}</b>
                    <span>
                        <img width="100%" height="100%" src={user.honorImg} />
                    </span>
                    <i />
                </div>
            </div>
        );

        // @todo 这个拿出去单独做一个组件
        const msgDom = (
            <div className={style.xf}>
                <span className={style.xfSpan}>
                    <img src={imageXin} />
                </span>
                <p />
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
                    <li className={style.zh}>
                        <a href="#" target="_blank" title="">
                            账号信息
                        </a>
                    </li>
                    <li className={style.nr}>
                        <a href="#" target="_blank" title="">
                            内容同步
                        </a>
                    </li>
                    <li className={style.tq}>
                        <a href="#" target="_blank" title="">
                            特权管理
                        </a>
                    </li>
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
                {msgDom}
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
