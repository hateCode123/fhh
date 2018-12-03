import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import imageXin from './images/xin.png';

/**
 * 定义 Header 组件
 */
class Message extends React.PureComponent {
    static propTypes = {
        user: PropTypes.object,
    };
    /**
     * 渲染组件
     */
    render() {
        const { user } = this.props;

        console.log(this.props.user);

        // opacity: 0.5;

        return (
            <div className={style.xf}>
                <span className={style.xfSpan}>
                    <img src={imageXin} />
                </span>
                <p />
            </div>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    messageNum: state.messageNum,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Message));
