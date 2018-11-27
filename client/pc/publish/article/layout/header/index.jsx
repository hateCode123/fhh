import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';

/**
 * 定义 Header 组件
 */
class Header extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return (
            <div className={style.wrap}>
                <div className={style.nav} key="topNav">
                    <a href="//news.ifeng.com/" target="_blank" rel={rel}>
                        <img
                            src="//p0.ifengimg.com/37780e23b9ea2d8b/2017/38/logoNews.png"
                            width="161"
                            height="27"
                            alt="凤凰网资讯"
                        />
                    </a>
                    <ul className={style.list}>
                        <li>
                            <a href="//www.ifeng.com/" target="_blank" rel={rel}>
                                凤凰网首页
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Header);
