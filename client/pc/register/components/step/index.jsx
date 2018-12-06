import React, { Component } from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Step extends Component {
    render() {
        return (
            <div className={style.zt_register}>
                <div className={style.register_lc}>
                    <ul className={style.register_ul}>
                        <li className={style.zc_01} />
                        <li className={style.zc_02} />
                        <li className={style.zc_03}>
                            <p>步骤</p>
                            <span>3</span>
                        </li>
                    </ul>
                    <ul className={style.bt_register}>
                        <li style={{ marginRight: 200 }}>注册账号</li>
                        <li style={{ marginRight: 200 }}>选择类型</li>
                        <li className={style.cur}>入驻信息</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Step);
