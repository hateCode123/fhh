import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import auth from '@ifeng/ui_pc_auth';
import { resetStore } from '../../utils';
/**
 * 定义 Header 组件
 */
class UserInfo extends React.PureComponent {
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
        // resetStore();
    };

    /**
     * 渲染组件
     */
    render() {
        console.log(this.props.user);

        return (
            <div className={style.head_name}>
                <div className={style.user_name}>用户名称用户</div>
                <span>|</span>
                <div onClick={this.handleLoginOut} className={style.tc}>
                    退出
                </div>
            </div>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    user: state.user.info,
    account: state.user.accountInfo,
    // dictionary: state.dictionary,
});

const mapDispatchToProps = dispatch => ({
    // asyncChangeCurPage: str => dispatch(asyncChangeCurPage(str)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(UserInfo));

// export default errorBoundary(UserInfo);
