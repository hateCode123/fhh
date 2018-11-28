import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Header from '../../components/header/';
import Footer from '../../components/footer/';
import BottomAffix from '../../components/bottomAffix/';
import Sider from '../../components/sider/';

/**
 * for this page
 */
// import Content from './content/';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;

        return (
            <Fragment>
                <Header />
                <div className={style.col}>
                    <Sider />
                    {/* <Content /> */}
                </div>
                <Footer />
                <BottomAffix />
            </Fragment>
        );
    }
}

export default errorBoundary(Layout);
