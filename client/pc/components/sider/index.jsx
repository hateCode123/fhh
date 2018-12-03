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

    state = {
        currentURL: window.location.pathname || '',
        siderTree_home: [
            {
                privilege: false,
                content: '评论管理',
                link: '',
                title: '评论管理',
            },
            {
                privilege: false,
                content: '数据分析',
                link: '',
                title: '数据分析',
            },
            {
                tiyanqiTips: true,
                privilege: false,
                content: '流量+',
                link: '',
                title: '流量+',
            },
            {
                privilege: 'mcn',
                content: 'MCN管理',
                link: '',
                title: 'MCN管理',
            },
            {
                tiyanqiTips: true,
                privilege: false,
                content: '收益&结算',
                link: '',
                title: '收益&结算',
            },
        ],
        siderTree_article: [
            {
                privilege: false,
                content: '图文管理',
                link: '',
                title: '图文管理',
            },
            {
                privilege: false,
                content: '发布文章',
                link: '',
                title: '发布文章',
            },
            {
                tiyanqiTips: true,
                privilege: false,
                content: '发布图集',
                link: '',
                title: '发布图集',
            },
            {
                privilege: false,
                content: '图文数据',
                link: '',
                title: '图文数据',
            },
            {
                privilege: 'originalProtection',
                content: '原创保护',
                link: '',
                title: '原创保护',
            },
        ],
        siderTree_video: [
            {
                tiyanqiTips: true,
                privilege: false,
                content: '视频管理',
                link: '',
                title: '视频管理',
            },
            {
                tiyanqiTips: true,
                privilege: false,
                content: '发布视频',
                link: '',
                title: '发布视频',
            },
            {
                tiyanqiTips: true,
                privilege: false,
                content: '视频数据',
                link: '',
                title: '视频数据',
            },
        ],
    };

    componentDidMount() {
        getAccountPrivilegeListOpened();
    }

    // static getDerivedStateFromProps(nextProps, prevState) {}

    isTiyanqiTips = () => {
        console.log('体验期账号无法使用');
    };

    renderList = sourceArray => {
        const { privilegeList, account } = this.props;
        const { currentURL } = this.state;

        const isTiyanqi = account && account.isTiyanqi;

        const newIcon = (
            <span>
                <img src={NewPng} />
            </span>
        );

        const result = sourceArray.map(item => {
            const classNameStr = item.link === currentURL ? style.cur : '';
            let eachLine = null;

            /**
             * 先判断权限为真: 情况1，设置了权限校验字段，并且从权限数据里取到为true。情况2，没有权限校验字段。
             * 再判断体验期: 当前账号为体验期账号 && 该导航存在tiyanqiTips为true。
             */

            if ((item.privilege && privilegeList[item.privilege]) || !item.privilege) {
                eachLine =
                    isTiyanqi && item.tiyanqiTips ? (
                        <li>
                            <a href="javascript:;" onClick={this.isTiyanqiTips} title="体验期账号无法使用该功能">
                                {item.content}
                            </a>
                        </li>
                    ) : (
                        <li className={classNameStr}>
                            <a href={item.link} target="_blank" rel={rel} title={item.title}>
                                {item.content}
                            </a>
                        </li>
                    );
            }

            return eachLine;
        });

        return result;
    };

    render() {
        const { currentURL, siderTree_home, siderTree_article, siderTree_video } = this.state;

        const listDom_home = this.renderList(siderTree_home);
        const listDom_article = this.renderList(siderTree_article);
        const listDom_video = this.renderList(siderTree_video);

        const isIndexCurrentPageClassName = currentURL === '/index' ? style.current : '';

        return (
            <div className={style.col_left}>
                <div className={style.list_index}>
                    <p className={`${style.list_index_tit} ${isIndexCurrentPageClassName}`}>
                        <a href="index_wtg.html" target="_blank" rel={rel} title="">
                            主页
                        </a>
                    </p>
                    <ul>{listDom_home}</ul>
                </div>
                <div className={style.list_index}>
                    <p className={style.list_img_tit}>图文</p>
                    <ul>{listDom_article}</ul>
                </div>
                <div className={style.list_index}>
                    <p className={style.list_video_tit}>凤凰视频</p>
                    <ul>{listDom_video}</ul>
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
