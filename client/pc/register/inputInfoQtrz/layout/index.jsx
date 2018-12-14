import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import Header from '../../../components/header/';
import Footer from '../../../components/footer/';
import BottomAffix from '../../../components/bottomAffix/';
import Step from '../../components/step';
import { connect } from 'react-redux';
import { actions } from '../models';

/**
 * for this page
 */
import Content from './content/';
import TipModal from '../components/tipsModal';

class Layout extends React.PureComponent {
    static propTypes = {
        uiStatus: PropTypes.object,
    };

    render() {
        console.log(this.props);
        /**
         * 组件分发数据
         */
        const { uiStatus } = this.props;
        const isTipsModalShow = uiStatus.isTipsModalShow;

        return (
            <Fragment>
                <Header />
                <Step />
                <Content />
                <Footer />
                <BottomAffix />
                {isTipsModalShow ? <TipModal /> : null}
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    uiStatus: state.inputInfoQtrz.uiStatus,
});

const mapDispatchToProps = dispatch => ({
    updateUiStatus: obj => dispatch(actions.changeUiStatus(obj)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Layout));
// export default errorBoundary(Layout);
