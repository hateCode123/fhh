import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import { connect } from 'react-redux';
import errorBoundary from '@ifeng/errorBoundary';
import { actions } from '../../models';
import pic from './dui_img.png';

/**
 * for this page
 */

class TipsModal extends React.PureComponent {
    static propTypes = {
        updateUiStatus: PropTypes.func,
        registerStatus: PropTypes.string,
        errorMessage: PropTypes.string,
    };

    state = {
        timeCount: 5,
        count: 5,
    };

    componentDidMount() {
        console.log('出现啦');
        const { registerStatus } = this.props;

        if (registerStatus && registerStatus === 'success') {
            this.timerCountDown();
        }
    }

    componentWillUnmount() {
        // 组件销毁时清空setState
        this.setState = (state, callback) => {
            return;
        };
    }

    timerCountDown() {
        let timeCount = this.state.timeCount;

        console.log(timeCount);
        const timer = setInterval(() => {
            this.setState(
                {
                    timeCount: timeCount--,
                    count: timeCount,
                },
                () => {
                    if (timeCount === 0) {
                        clearInterval(timer);
                        this.setState({
                            timeCount: 5,
                            count: 5,
                            text: '重新获取',
                        });
                        this.props.updateUiStatus({ isTipsModalShow: false });
                    }
                },
            );
        }, 1000);
    }
    handlerClick() {
        this.props.updateUiStatus({ isTipsModalShow: false });
    }

    render() {
        // console.log(this.props);
        /**
         * 组件分发数据
         */
        const { registerStatus, errorMessage } = this.props;

        return (
            <Fragment>
                <div className={style.mask} onClick={this.handlerClick.bind(this)}>
                    <div className={style.submit_k}>
                        {registerStatus && registerStatus === 'success' ? (
                            <Fragment>
                                <div className={style.dui_img}>
                                    <img src={pic} />{' '}
                                </div>
                                <p>提交成功</p>
                                <p>
                                    <span>{this.state.count}</span>秒后自动跳转到等待审核页面
                                </p>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <p className={style.error}>{errorMessage}</p>
                                <p>点击关闭</p>
                            </Fragment>
                        )}
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    uiStatus: state.inputInfoQtrz.uiStatus,
    registerStatus: state.inputInfoQtrz.registerStatus,
    errorMessage: state.inputInfoQtrz.errorMessage,
});

const mapDispatchToProps = dispatch => ({
    updateUiStatus: obj => dispatch(actions.changeUiStatus(obj)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(TipsModal));
