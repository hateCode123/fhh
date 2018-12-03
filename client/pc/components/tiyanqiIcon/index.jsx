import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import imageWen from './images/wen_index.png';

/**
 * 定义 Header 组件
 */
class TiyanqiIcon extends React.PureComponent {
    static propTypes = {
        // account: PropTypes.object,
    };
    /**
     * 渲染组件
     */
    render() {
        return (
            <div className={style.tyq}>
                体验期<img src={imageWen} />
                {/* style="bottom: -236px;" */}
                <p className={style.ts_index}>
                    <i className={style.ts_tit_index}>体验期</i>
                    <i className={style.tit_txt}>
                        用户在体验期最多只能发布3篇文章，用于体验平台对于新用户的流量扶持，了解基本的发文流程。
                    </i>
                    <i className={style.tit_txt}>
                        申请正式入驻，完善个人信息并通过审核，即可成为正式的个人帐号主，不再收到发文篇数的限制。
                    </i>
                    <i className={style.tit_txt}>
                        当前剩余体验文章数：<b>1</b>/3
                    </i>
                </p>
                <span className={style.sj_d} />
            </div>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    account: state.user.account,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(TiyanqiIcon));
