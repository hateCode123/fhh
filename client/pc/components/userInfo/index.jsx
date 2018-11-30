import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import auth from '@ifeng/ui_pc_auth';
/**
 * 定义 Header 组件
 */
class UserInfo extends React.PureComponent {
    static propTypes = {
        user: PropTypes.object,
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
        const { user } = this.props;

        console.log(this.props.user);

        return (
            <div className={style.head_name}>
                <div className={style.user_name}>{user.weMediaName}</div>
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
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(UserInfo));
