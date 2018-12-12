import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Header from '../../../components/header/';
import Footer from '../../../components/footer/';
import BottomAffix from '../../../components/bottomAffix/';
import Sider from '../../../components/sider/';
import RightTit from './rightTit/rightTit';
import DataList from './dataList/dataList';
import TabData from './tabTime/tabTime';
import TableList from './tableList/tableList';

/**
 * for this page
 */
// import Content from './content/';

class Layout extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };

    render() {
        /**
         * 组件分发数据
         */
        // const { content } = this.props;

        return (
            <Fragment>
                <Header />

                {/* <Content /> */}
                <div className={style.w_1200}>
                    <Sider />
                    <div className={style.col_right}>
                        <RightTit />
                        <DataList
                            item={[
                                {
                                    num: 121,
                                    title: '累计发布数',
                                },
                                {
                                    num: 188,
                                    title: '累计推荐量',
                                },
                                {
                                    num: 2225,
                                    title: '累计阅读量',
                                },
                                {
                                    num: 527383,
                                    title: '累计评论数',
                                },
                                {
                                    num: 527383,
                                    title: '累计分享数',
                                },
                                {
                                    num: 527383,
                                    title: '累计收藏数',
                                },
                                {
                                    num: 527383,
                                    title: '累计粉丝数',
                                },
                            ]}
                        />

                        <TabData
                            echartsData={[
                                {
                                    name: '发布数',
                                    type: 'bar',
                                    stack: '总量',
                                    data: [120, 132, 101, 134, 90, 230, 210],
                                },
                                {
                                    name: '推荐量',
                                    type: 'bar',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '阅读量',
                                    type: 'bar',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '评论量',
                                    type: 'bar',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '分享量',
                                    type: 'bar',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '收藏量',
                                    type: 'bar',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '粉丝数',
                                    type: 'bar',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '发布数',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 132, 101, 134, 90, 230, 210],
                                },
                                {
                                    name: '推荐量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '阅读量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '评论量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '分享量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '收藏量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '粉丝数',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '发布数',
                                    type: 'line',
                                    stack: '总量',
                                    data: [120, 132, 101, 134, 90, 230, 210],
                                },
                                {
                                    name: '推荐量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '阅读量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '评论量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '分享量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '收藏量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '粉丝数',
                                    type: 'line',
                                    stack: '总量',
                                    data: [220, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '发布数',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 132, 101, 134, 90, 230, 210],
                                },
                                {
                                    name: '推荐量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '阅读量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '评论量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '分享量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '收藏量',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                                {
                                    name: '粉丝数',
                                    type: 'line',
                                    stack: '总量',
                                    data: [123, 182, 191, 234, 290, 330, 310],
                                },
                            ]}
                        />
                        <TableList
                            TabledateJson={[
                                {
                                    sheetData: [
                                        {
                                            data: '2018-09-10',
                                            fabu: '4',
                                            Recommend: '63592',
                                            Read: '15',
                                            comment: '63592',
                                            share: '15',
                                            Collection: '29',
                                            fans: '100',
                                        },
                                        {
                                            data: '2018-09-10',
                                            fabu: '4',
                                            Recommend: '63592',
                                            Read: '15',
                                            comment: '63592',
                                            share: '15',
                                            Collection: '29',
                                            fans: '100',
                                        },
                                    ],
                                    sheetName: 'sheet',
                                    sheetFilter: [
                                        'fans',
                                        'Collection',
                                        'share',
                                        'comment',
                                        'Read',
                                        'Recommend',
                                        'fabu',
                                        'data',
                                    ],
                                    sheetHeader: [
                                        '粉丝数',
                                        '收藏数',
                                        '分享数',
                                        '评论数',
                                        '阅读数',
                                        '推荐量',
                                        '发布数',
                                        '日期',
                                    ],
                                },
                            ]}
                        />
                    </div>
                </div>

                <Footer />
                <BottomAffix />
            </Fragment>
        );
    }
}

export default errorBoundary(Layout);
