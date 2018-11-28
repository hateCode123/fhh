import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Header from '../../components/header/';
import Footer from '../../components/footer/';
import BottomAffix from '../../components/bottomAffix/';
import Sider from '../../components/sider/';
import auth, { LoginDialog } from '@ifeng/ui_pc_auth';
import { setUserInfoStore } from '../../utils/';

/**
 * for this page
 */
// import Content from './content/';

class Layout extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };

    loginId = auth.uuid();

    componentDidMount() {
        this.unBindLogin = auth.event.on(auth.EVENTNAMES.login, userInfo => {
            this.changePage(userInfo);
        });
    }

    componentWillUnmount() {
        this.unBindLogin();
    }

    changePage = data => {
        const urlSearch = window.location.search.split('?url=');
        let jumpTo = '/index';

        if (urlSearch && urlSearch[1] && urlSearch[1].trim().length > 0) {
            jumpTo = urlSearch[1];
        }

        window.location.href = jumpTo;
    };

    handleLoginIn = () => {
        auth.login(this.loginId);
    };

    render() {
        /**
         * 组件分发数据
         */

        return (
            <div className={style.login}>
                <button onClick={this.handleLoginIn}>点击登录</button>

                <LoginDialog id={this.loginId} />
            </div>
        );
    }
}

export default errorBoundary(Layout);
