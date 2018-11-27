import { addEventListener } from '@ifeng/ui_base';
import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import style from './index.css';
import NewPng from './images/new.png';
import { rel } from '@ifeng/ui_rel';

class Sider extends React.PureComponent {
    static propTypes = {
        // content: PropTypes.array,
        // isEnd: PropTypes.bool,
    };
    static defaultProps = {
        isEnd: false,
        repeatedID: [],
    };

    state = {};

    componentDidMount() {}

    render() {
        // const { content } = this.state;

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
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                MCN管理
                            </a>
                            <span>
                                <img src={NewPng} />
                            </span>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                CPM流量分成
                            </a>
                            <span>
                                <img src={NewPng} />
                            </span>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                收益&amp;结算
                            </a>
                            <span>
                                <img src={NewPng} />
                            </span>
                        </li>
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
                        <li>
                            <a href="javascript:;" target="_blank" rel={rel} title="" className={style.img_j}>
                                发布图集
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                图文数据
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                原创保护
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={style.list_index}>
                    <p className={style.list_video_tit}>凤凰视频</p>
                    <ul>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                视频管理
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;" target="_blank" rel={rel} title="" className={style.img_j}>
                                发布视频
                            </a>
                        </li>
                        <li>
                            <a href="#" target="_blank" rel={rel} title="">
                                视频数据
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={style.list_index}>
                    <p className={style.list_nr_tit}>短内容</p>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Sider);
