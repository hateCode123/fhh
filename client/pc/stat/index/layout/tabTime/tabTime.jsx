import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
{
    /* 引入 ECharts 主模块*/
}
import echarts from 'echarts/lib/echarts';
{
    /* //引入柱状图*/
}
import 'echarts/lib/chart/Line';
import 'echarts/lib/chart/bar';
{
    /* 引入提示框和标题组件*/
}
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import styles from './tabTime.css';

class TabData extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            currentIndex: 0,
        };
    }

    static propTypes = {
        echartsData: PropTypes.array,
    };

    componentDidMount() {
        this.renderEcharts();
    }

    componentDidUpdate() {
        this.renderEcharts();
    }

    renderEcharts = () => {
        let myChart = echarts.init(document.getElementById('main'));

        const { echartsData } = this.props;

        myChart.setOption({
            title: {
                text: '',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
            },
            color: ['#f54343', '#bd1f1f', '#faa23b', '#e37e1b', '#c0e8be', '#b1d2b7', '#3d77ce'],
            legend: {
                data: ['发布数', '推荐量', '阅读量', '评论量', '分享量', '收藏量', '粉丝数'],
                top: 20,
                icon: 'circle',
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
            },
            toolbox: {
                top: 0,
                feature: {
                    magicType: { show: true, type: ['line', 'bar'] },
                },
            },
            xAxis: {
                type: 'category',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: {
                type: 'value',
            },
            series: echartsData,
        });

        // this.myChart && echarts.dispose(this.myChart);
    };

    check_title_index(index) {
        return index === this.state.currentIndex ? `${styles.tab_title} ${styles.active} ` : `${styles.tab_title}`;
    }

    setData = index => {
        this.setState({ currentIndex: index });

        // const myChart = echarts.init(document.getElementById('main'));

        // myChart.setOption({ series: this.props.children[index].props.jsonData });
    };

    render() {
        return (
            <Fragment>
                <div className={styles.tab_title_wrap}>
                    <div onClick={() => this.setData(0)} className={this.check_title_index(0)}>
                        昨天
                    </div>

                    <div onClick={() => this.setData(1)} className={this.check_title_index(1)}>
                        7天
                    </div>
                    <div onClick={() => this.setData(2)} className={this.check_title_index(2)}>
                        14天
                    </div>
                    <div onClick={() => this.setData(3)} className={this.check_title_index(3)}>
                        30天
                    </div>
                </div>
                {/* Tab内容区域 */}
                <div className={styles.sjqs}>
                    <p className={styles.sj_tit}>
                        <span>数据趋势</span>
                        <i>2018/09/10-2018/09/10</i>
                    </p>
                    <div className={styles.show}>
                        <div id="main" style={{ width: 900, height: 450 }} />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default TabData;
