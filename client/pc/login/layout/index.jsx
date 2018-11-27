import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Header from '../../components/header/';
import Footer from '../../components/footer/';
import BottomAffix from '../../components/bottomAffix/';
import Sider from '../../components/sider/';
import auth, { LoginDialog } from '@ifeng/ui_pc_auth';

/**
 * for this page
 */
// import Content from './content/';

import { userLogin } from '../../services/api.js';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        isShow: false,
        userInfo: auth.isLogin() ? auth.getUserInfo() : null,
    };

    loginId = auth.uuid();

    componentDidMount() {
        this.unBindLogin = auth.event.on(auth.EVENTNAMES.login, userInfo => {
            this.setState({
                userInfo,
            });
        });
        this.unBindLogout = auth.event.on(auth.EVENTNAMES.logout, () => {
            this.setState({
                userInfo: null,
            });
        });
    }

    componentWillUnmount() {
        this.unBindLogin();
        this.unBindLogout();
    }

    login = () => {
        userLogin();
    };

    handleLoginIn = () => {
        console.log('</button>');
        auth.login(this.loginId);
    };

    handleLoginOut = () => {
        auth.logout();
    };

    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;

        console.log(content);

        const isLogin = auth.isLogin();

        console.log('isLogin= ', isLogin, this.loginId);

        let login = '';

        if (isLogin) {
            // window.location.href = '/index';

            login = (
                <Fragment>
                    <Header />
                    <div className={style.col}>
                        <Sider />
                        {/* <Content /> */}

                        <button onClick={this.login}>测试接口</button>
                    </div>
                    <Footer />
                    <BottomAffix />
                </Fragment>
            );
        } else {
            login = (
                <div className={style.login}>
                    <button onClick={this.handleLoginIn}>登录</button>;
                    {/* {option.map(item => (iconShow ? iconOptions[item] : options[item]))} */}
                    <LoginDialog id={this.loginId} />
                </div>
            );
        }

        return login;
    }
}

export default errorBoundary(Layout);
