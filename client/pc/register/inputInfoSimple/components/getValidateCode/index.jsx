import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import { connect } from 'react-redux';
import errorBoundary from '@ifeng/errorBoundary';
import { actions } from '../../models';

/**
 * for this page
 */

class GetValidateCode extends React.PureComponent {
    state = {
        timeCount: 5,
        text: '获取验证码',
    };
    // static propTypes = {
    //     content: PropTypes.object,
    // };

    onClick() {
        if (this.props.onClick) {
            this.props.onClick();
            console.log(this.refs.btn);
        } else {
            return true;
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.isCountdown !== nextProps.isCountdown) {
            if (nextProps.isCountdown === true) {
                this.timerCountDown();
            }
        }
    }
    timerCountDown() {
        let timeCount = this.state.timeCount;

        console.log(timeCount);
        const timer = setInterval(() => {
            this.setState(
                {
                    timeCount: timeCount--,
                    text: timeCount + '秒后重新获取',
                },
                () => {
                    if (timeCount === 0) {
                        clearInterval(timer);
                        this.setState({
                            timeCount: 60,
                            text: '重新获取',
                        });
                        this.props.updateUiStatus({ isCountdown: false });
                    }
                },
            );
        }, 1000);
    }

    render() {
        // console.log(this.props);
        /**
         * 组件分发数据
         */
        const { isCountdown } = this.props.uiStatus;

        const countdown = () => {
            if (isCountdown) {
                this.refs.btn.setAttribute('disabled', true);
                this.timerCountDown();

                return `${this.state.timeCount}秒后重新获取`;
            } else {
                return '获取验证码';
            }
        };

        return (
            <Fragment>
                <button ref={'btn'} className={style.btn} onClick={this.onClick.bind(this)}>
                    {this.state.text}
                </button>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    uiStatus: state.inputInfoSimple.uiStatus,
});

const mapDispatchToProps = dispatch => ({
    asyncQueryKeywords: str => dispatch(asyncQueryKeywords(str)),
    asyncQueryPhoneNum: str => dispatch(asyncQueryPhoneNum(str)),
    updateUiStatus: obj => dispatch(actions.changeUiStatus(obj)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(GetValidateCode));
