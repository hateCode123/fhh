import React, { Fragment } from 'react';
import { rel } from '@ifeng/ui_rel';
import style from './rightTit.css';

class RightTit extends React.PureComponent {
    render() {
        return (
            <div className={style.col_right}>
                <div className={style.col_920}>
                    <div className={style.bt_tit}>
                        <span>概况</span>
                        <p>
                            <a href="https://www.ifeng.com/" target="_blank" title="" rel={rel}>
                                图文数据
                            </a>
                            <a href="https://www.ifeng.com/" target="_blank" title="" rel={rel}>
                                视频数据
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default RightTit;
