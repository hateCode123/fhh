import React, { Fragment } from 'react';
import style from './step.css';

class Step extends React.PureComponent {
    render() {
        return (
            <div className={style.zt_register}>
                <div className={style.register_lc}>
                    <ul className={style.register_ul}>
                        <li className={style.zc_01} />
                        <li className={style.zc_02}>
                            <p>步骤</p>
                            <span>2</span>
                        </li>
                        <li className={style.zc_03}>
                            <p>步骤</p>
                            <span>3</span>
                        </li>
                    </ul>
                    <ul className={style.bt_register}>
                        <li style={{ marginRight: 200 }}>注册账号</li>
                        <li className={style.cur} style={{ marginRight: 200 }}>
                            选择类型
                        </li>
                        <li>入驻信息</li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Step;
