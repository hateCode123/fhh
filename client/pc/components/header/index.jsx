import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';
import UserInfo from '../userInfo/';
import logo from './images/logo.png';

import { getAccountStatus } from '../../utils/getAccountStatus';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    /**
     * 渲染组件
     */

    componentDidMount() {
        getAccountStatus();
    }

    render() {
        return (
            <div className={style.head}>
                <div className={style.w_1200}>
                    <div className={style.logo}>
                        <a href="#" rel={rel} target="_blank" title="">
                            <img src={logo} width="120" height="36" />
                        </a>
                    </div>
                    <UserInfo />
                </div>
            </div>
        );
    }
}

export default errorBoundary(Header);