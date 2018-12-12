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
    state = {
        timeCount: 5,
        count: 5,
    };

    static propTypes = {
        updateUiStatus: PropTypes.func,
    };

    componentDidMount() {
        console.log('出现啦');
        this.timerCountDown();
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

        return (
            <Fragment>
                <div className={style.mask} onClick={this.handlerClick.bind(this)}>
                    <div className={style.submit_k}>
                        <div className={style.dui_img}>
                            <img src={pic} />{' '}
                        </div>
                        <p>提交成功</p>
                        <p>
                            <span>{this.state.count}</span>秒后自动跳转到体验页
                        </p>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    uiStatus: state.inputInfoSimple.uiStatus,
});

const mapDispatchToProps = dispatch => ({
    updateUiStatus: obj => dispatch(actions.changeUiStatus(obj)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(TipsModal));
