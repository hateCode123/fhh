import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import errorBoundary from '@ifeng/errorBoundary';

import { rel } from '@ifeng/ui_rel';
import logo from './images/logo.png';
import UserInfo from '../userInfo/';
import UserInfoWidthMCN from '../userInfoWithMCN';

import { getAccountStatus } from '../../utils';

import style from './index.css';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    static propTypes = {
        account: PropTypes.object,
    };

    /**
     * 渲染组件
     */

    componentDidMount() {
        getAccountStatus();
    }

    render() {
        const { account } = this.props;

        return (
            <div className={style.head}>
                <div className={style.w_1200}>
                    <div className={style.logo}>
                        <a href="#" rel={rel} target="_blank" title="">
                            <img src={logo} width="120" height="36" />
                        </a>
                    </div>
                    {account && account.status !== 7 ? <UserInfoWidthMCN /> : <UserInfo />}
                </div>
            </div>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    account: state.user.accountInfo,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Header));
