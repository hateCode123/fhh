import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Header from '../../../components/header/';
import Footer from '../../../components/footer/';
import BottomAffix from '../../../components/bottomAffix/';
import Sider from '../../../components/sider/';
import Step from './step';
import ChooseList from './chooseList';

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
                <Step />
                <ChooseList />
                <Footer />
                <BottomAffix />
            </Fragment>
        );
    }
}

export default errorBoundary(Layout);
