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
        messageNum: PropTypes.number,
    };

    /**
     * 渲染组件
     */
    render() {
        const { messageNum } = this.props;

        return (
            <div className={style.xf}>
                <span className={style.xfSpan} style={messageNum === 0 ? { opacity: '.5' } : {}}>
                    <img src={imageXin} />
                </span>
                {messageNum && messageNum !== 0 ? <p>{messageNum}</p> : null}
            </div>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    messageNum: state.user.messageNum,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Message));
