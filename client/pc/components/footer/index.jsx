import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 Footer 组件
 */
class Footer extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        return (
            <div className={style.footer}>
                联系邮箱：zmt@ifeng.com<br />
                Copyright © 2018 Phoenix New Media Limited All Rights Reserved 凤凰新媒体 版权所有
            </div>
        );
    }
}

export default errorBoundary(Footer);
