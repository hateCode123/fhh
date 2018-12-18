import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Item from 'antd/lib/list/Item';

/**
 * for this page
 */
import HomePageData from './homePageData';

class Content extends React.PureComponent {
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

    render() {
        /**
         * 组件分发数据
         */
        // const { content } = this.props;

        return (
            <Fragment>
                <div className={style.col_right}>
                    <div className={style.col_920}>
                        <HomePageData />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(Content);
