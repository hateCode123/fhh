import { addEventListener } from '@ifeng/ui_base';
import React, { PureComponent, createRef } from 'react';
import PropTypes from 'prop-types';
import errorBoundary from '@ifeng/errorBoundary';
import styles from './index.css';

import { getLivingColumnData, getCommentCount } from '../../../../services/api';
import { rel } from '@ifeng/ui_rel';

class CardStream extends React.PureComponent {
    static propTypes = {
        content: PropTypes.array,
        isEnd: PropTypes.bool,
    };
    static defaultProps = {
        isEnd: false,
        repeatedID: [],
    };

    state = {
        commentData: {},
        content: this.props.content, // 文章列表
        isEnd: this.props.isEnd, // 是否结束
        isLoading: false, // 是否加载中
    };

    constructor(...argv) {
        super(...argv);

        this.list = createRef();
        this.lastItem = null; // 最后一条数据
    }

    componentDidMount() {
        this.getCommentCount();
    }

    getURL = data => {
        const { content } = this.props;

        const source = data || content || [];

        return source.map(item => item.commentUrl);
    };
    getCommentCount = async __data => {
        try {
            const { commentData } = this.state;

            const data = await getCommentCount(this.getURL(__data));

            const __commentData = {};

            data.forEach(item => {
                __commentData[item['doc_url']] = item['allcount'];
            });

            await this.setState({
                commentData: { ...commentData, ...__commentData },
            });
        } catch (err) {
            console.error(err);
        }
    };

    // 加载更多
    handleGetColumnInfoClick = async () => {
        this.setState({
            isLoading: true,
        });

        try {
            const time = new Date(this.lastItem.newsTime).getTime();

            const { data } = await getLivingColumnData(this.lastItem.id, time, 8);

            await this.getCommentCount(data.newsstream);

            this.setState({
                content: this.state.content.concat(data.newsstream),
                isEnd: data.isEnd,
                isLoading: false,
            });
        } catch (err) {
            console.error(err);
            this.setState({
                isLoading: false,
                getDataError: true,
            });
        }
    };

    renderCardCell(item, index, pinglunUrl) {
        const { commentData } = this.state;

        return (
            <li className={styles.li01} key={index}>
                <div className={styles.d01}>
                    <a href={item.url} target="_blank" rel={rel}>
                        <img src={item.thumbnail} alt={item.title} />
                    </a>
                </div>
                <div className={styles.d02}>
                    <p className={styles.p11}>
                        VOL.<span>
                            <em>{item.serial || ''}</em>
                        </span>
                    </p>
                    <p className={styles.p12}>
                        <a href={item.url} target="_blank" rel={rel}>
                            {item.title}
                        </a>
                    </p>
                    <ul className={styles.p13}>
                        <li className={styles.type_author}>摄影</li>
                        <li className={styles.author_name}>{item.author}</li>
                    </ul>
                    <div className={styles.each_comment}>
                        <a href={pinglunUrl} target="_blank" rel={rel}>
                            {commentData[item.commentUrl] || '-'}
                        </a>
                    </div>
                    <p className={styles.p14}>{item.summary}</p>
                </div>
            </li>
        );
    }
    // 渲染list
    listView(list) {
        this.countMap = {};
        const endIndex = list.length - 1;
        const id = [];

        return list.map((item, index) => {
            // 获取最后一位的信息，用于加载信息流
            if (index === endIndex) this.lastItem = item;

            // 将已渲染id加入到数组
            const idKey = `list_${item.id}`;

            id.push(idKey);

            // 评论地址
            const query = `docUrl=${item.commentUrl}&docName=${item.title}&skey=${item.skey}&pcUrl=${item.url}`;
            const pinglunUrl = `https://gentie.ifeng.com/view.html?${query}`;

            return this.renderCardCell(item, index, pinglunUrl);
        });
    }
    // 查看更多
    moreView() {
        return this.state.isEnd ? (
            <span className={styles.is_end}>已显示全部</span>
        ) : (
            <a className={styles.more} onClick={this.handleGetColumnInfoClick} />
        );
    }
    render() {
        const { content } = this.state;

        if (content.length === 0) {
            return (
                <div>
                    <div className={styles.more_box}>
                        <span className={styles.is_end}>暂无数据</span>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={styles.list}>
                    {/* 新闻列表 */}
                    <ul ref={this.list} className={styles.clearfix}>
                        {this.listView(content)}
                    </ul>
                    {/* 点击查看更多 */}

                    <div className={styles.more_box}>
                        {this.state.isLoading ? <span className={styles.is_end}>加载中...</span> : this.moreView()}
                    </div>
                </div>
            );
        }
    }
}

export default errorBoundary(CardStream);
