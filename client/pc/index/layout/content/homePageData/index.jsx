import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Item from 'antd/lib/list/Item';

/**
 * for this page
 */
// import Content from './content/';

class HomePageData extends React.PureComponent {
    static propTypes = {
        // content: PropTypes.object,
    };

    state = {
        homePageData: {
            commentNum: 375,
            pv: 1316917,
            publishNum: 0,
            subscribeNum: 167,
        },
    };

    UNSAFE_componentWillMount() {
        const { homePageData } = this.state;

        this.formatNumListData(homePageData);
    }

    formatNumListData = res => {
        const dataArr = [];

        for (const key in res) {
            if (res.hasOwnProperty(key)) {
                const obj = {};

                obj.num = res[key];
                switch (key) {
                    case 'commentNum':
                        obj.txt = '累计发布数';
                        obj.txt_last = '昨日发布数';
                        break;
                    case 'pv':
                        obj.txt = '累计推荐量';
                        obj.txt_last = '昨日推荐量';
                        break;
                    case 'publishNum':
                        obj.txt = '累计阅读量';
                        obj.txt_last = '昨日阅读量';
                        break;
                    case 'subscribeNum':
                        obj.txt = '累计粉丝数';
                        obj.txt_last = '昨日粉丝数';
                        break;

                    default:
                        break;
                }
                dataArr.push(obj);
            }
        }

        console.log(dataArr);
        this.setState({
            homePageDataArr: dataArr,
        });
    };

    render() {
        /**
         * 组件分发数据
         */
        // const { content } = this.props;
        const { homePageDataArr } = this.state;

        const homePageData = (item, index) => {
            const cur = `item${index + 1}`;

            return (
                <li className={style[cur]} key={index}>
                    <i>1,288</i>
                    <span>{item.txt}</span>
                    <p>
                        {item.txt_last}
                        <b>3</b>
                    </p>
                </li>
            );
        };

        return (
            <Fragment>
                <div className={style.homePageData}>
                    <ul>
                        {homePageDataArr.map((item, index) => {
                            return homePageData(item, index);
                        })}
                    </ul>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(HomePageData);
