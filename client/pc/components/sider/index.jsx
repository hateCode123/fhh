import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import errorBoundary from '@ifeng/errorBoundary';
import { addEventListener } from '@ifeng/ui_base';
import { rel } from '@ifeng/ui_rel';
import style from './index.css';
import NewPng from './images/new.png';

import { getAccountPrivilegeListOpened } from '../../utils';
class Sider extends React.PureComponent {
    static propTypes = {
        privilegeList: PropTypes.object,
        account: PropTypes.object,
    };
    static defaultProps = {
        isEnd: false,
        repeatedID: [],
    };

    state = {};

    componentDidMount() {
        getAccountPrivilegeListOpened();
    }

    isTiyanqiTips = () => {
        console.log('体验期账号无法使用');
    };

    render() {
        const { privilegeList, account } = this.props;

        const isTiyanqi = account && account.isTiyanqi;

        const earningsDom = isTiyanqi ? (
            <li>
                <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                    收益&amp;结算
                </a>
            </li>
        ) : (
            <li>
                <a href="#" target="_blank" rel={rel} title="">
                    收益&amp;结算
                </a>
            </li>
        );

        const publishAlbumDom = isTiyanqi ? (
            <li>
                <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                    发布图集
                </a>
            </li>
        ) : (
            <li>
                <a href="javascript:;" target="_blank" rel={rel} title="">
                    发布图集
                </a>
            </li>
        );

        const videoManageDom = isTiyanqi ? (
            <li>
                <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                    视频管理
                </a>
            </li>
        ) : (
            <li>
                <a href="#" target="_blank" rel={rel} title="">
                    视频管理
                </a>
            </li>
        );

        const publishVideoDom = isTiyanqi ? (
            <li>
                <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                    发布视频
                </a>
            </li>
        ) : (
            <li>
                <a href="javascript:;" target="_blank" rel={rel} title="">
                    发布视频
                </a>
            </li>
        );

        const videoStatDom = isTiyanqi ? (
            <li>
                <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                    视频数据
                </a>
            </li>
        ) : (
            <li>
                <a href="#" target="_blank" rel={rel} title="">
                    视频数据
                </a>
            </li>
        );

        console.log('privilegeList', privilegeList);
        console.log('account', account);

        // original(pin): true
        // originalProtection(pin): true
        // insertProduct(pin): true
        // insertLink(pin): true
        // flowPlus(pin): true
        // comment(pin): true
        // doubleTitleAndCover(pin): true
        // authorisedImages(pin): true
        // outsideCover(pin): true
        // mcn(pin): true
        // honor(pin): true

        const newIcon = (
            <span>
                <img src={NewPng} />
            </span>
        );

        const originalProtectionDom = privilegeList.originalProtection ? (
            <li>
                <a href="#" target="_blank" rel={rel} title="">
                    原创保护
                </a>
            </li>
        ) : null;

        const mcnDom = privilegeList.mcn ? (
            <li>
                <a href="#" target="_blank" rel={rel} title="">
                    MCN管理
                </a>
            </li>
        ) : null;

        return (
            <div className={style.col_left}>
                <div className={style.list_index}>
                    <p className={style.list_index_tit}>
                        <a href="index_wtg.html" target="_blank" rel={rel} title="">
                            主页
                        </a>
                    </p>
                    <ul>
                        <li>
                            <a href="comment.html" target="_blank" rel={rel} title="">
                                评论管理
                            </a>
                        </li>
                        <li>
                            <a href="shuju.html" target="_blank" rel={rel} title="">
                                数据分析
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                流量+
                            </a>
                        </li>
                        {mcnDom}
                        {/* <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                CPM流量分成
                            </a>
                            <span>
                                <img src={NewPng} />
                            </span>
                        </li> */}

                        {earningsDom}
                    </ul>
                </div>
                <div className={style.list_index}>
                    <p className={style.list_img_tit}>图文</p>
                    <ul>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                图文管理
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                发布文章
                            </a>
                        </li>
                        {publishAlbumDom}

                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                图文数据
                            </a>
                        </li>
                        {originalProtectionDom}
                    </ul>
                </div>
                <div className={style.list_index}>
                    <p className={style.list_video_tit}>凤凰视频</p>
                    <ul>
                        {videoManageDom}
                        {publishVideoDom}
                        {videoStatDom}
                    </ul>
                </div>
                <div className={style.list_index}>
                    <p className={style.list_nr_tit}>短内容</p>
                </div>
            </div>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    privilegeList: state.user.privilegeList,
    account: state.user.accountInfo,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Sider));
