import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import errorBoundary from '@ifeng/errorBoundary';

import { cookie } from '@ifeng/ui_base';

import store from '../../common/store';
import { actions } from '../../common/models/user';

import style from './index.css';

/**
 * 定义 Header 组件
 */
class Guide extends React.PureComponent {
    static propTypes = {
        guide: PropTypes.object,
    };

    state = {
        showGuide1: false,
        showGuide2: false,
    };
    /**
     * 渲染组件
     */

    componentDidMount() {
        // name, value, path, domain, expires, secure

        const isFHHNewMember = cookie.get('isFHHNewMember');

        console.log('isFHHNewMember', isFHHNewMember);

        if (!isFHHNewMember || (isFHHNewMember && isFHHNewMember.length === 0)) {
            // cookie不存在 展示新手引导
            store.dispatch(actions.updateGuide({ showGuide1: true }));
            document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        }
    }
    showNext = () => {
        store.dispatch(actions.updateGuide({ showGuide1: false, showGuide2: true }));
    };

    finishGuide = () => {
        store.dispatch(actions.updateGuide({ showGuide1: false, showGuide2: false }));
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
        cookie.set('isFHHNewMember', '1', '', '', 5184000000);
    };

    render() {
        const { guide } = this.props;
        const { showGuide1, showGuide2 } = guide;

        const step = (
            <div
                className={style.yd_k}
                id="yd_k"
                style={showGuide1 || showGuide2 ? { display: 'block' } : { display: 'none' }}>
                <div
                    className={style.tyq_text}
                    id="tyq_text"
                    style={showGuide1 ? { display: 'block' } : { display: 'none' }}>
                    <h3>体验期</h3>
                    <p>体验期阶段最多只能发布3篇文章，用于体验平台的流量扶持，了解基本的发文流程。</p>
                    <p>
                        单击“<a href="zsrz_sq.html" target="_blank" title="">
                            申请正式入驻
                        </a>”，完善个人信息并通过审核，即可完成正式入驻不再受到发文篇数的限制。
                    </p>
                    <div className={style.yd_k_btn} onClick={this.showNext}>
                        下一步
                    </div>
                </div>

                <div className={style.tw_po} style={showGuide2 ? { display: 'block' } : { display: 'none' }}>
                    图文管理
                </div>
                <div
                    className={style.tyll_text}
                    id="tyll_text"
                    style={showGuide2 ? { display: 'block' } : { display: 'none' }}>
                    <h3>体验流量扶持</h3>
                    <p>
                        成功发布文章后，您可以在“图文管理”页面中，实时观察文章发布后的推荐数、阅读数，体验平台的流量支持效果。
                    </p>
                    <div className={style.yd_k_btn} onClick={this.finishGuide}>
                        开始体验
                    </div>
                </div>
            </div>
        );

        return step;
    }
}

// export default Container;
const mapStateToProps = state => ({
    guide: state.user.guide,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Guide));
