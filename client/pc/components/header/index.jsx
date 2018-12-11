import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import errorBoundary from '@ifeng/errorBoundary';
import { cookie } from '@ifeng/ui_base';
import { rel } from '@ifeng/ui_rel';
import logo from './images/logo.png';
import UserInfo from '../userInfo/';
import UserInfoWidthMCN from '../userInfoWithMCN';

import { initGetHeaderData } from '../../utils';

import style from './index.css';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    static propTypes = {
        account: PropTypes.object,
        guide: PropTypes.object,
    };

    /**
     * 渲染组件
     */

    componentDidMount() {
        initGetHeaderData();
    }

    render() {
        const { account, guide } = this.props;

        let userInfoHeader = <UserInfoWidthMCN />;

        if (guide.showGuide1) {
            userInfoHeader = (
                <div className={style.about1}>
                    <UserInfoWidthMCN />
                </div>
            );
        }

        return (
            <div className={style.head}>
                {guide.showGuide1 ? <div className={style.zz} /> : null}
                <div className={style.w_1200}>
                    <div className={style.logo}>
                        <a href="#" rel={rel} target="_blank" title="">
                            <img src={logo} width="120" height="36" />
                        </a>
                    </div>
                    {account && account.status !== 7 ? userInfoHeader : <UserInfo />}
                </div>
            </div>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    account: state.user.accountInfo,
    guide: state.user.guide,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Header));
