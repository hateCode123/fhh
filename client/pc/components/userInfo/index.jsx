import React from 'react';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';

/**
 * 定义 Header 组件
 */
class UserInfo extends React.PureComponent {
    static propTypes = {
        info: PropTypes.object,
    };
    /**
     * 渲染组件
     */
    render() {
        console.log(this.props.info);

        return (
            <div className={style.head_name}>
                <div className={style.user_name}>用户名称用户</div>
                <span>|</span>
                <div className={style.tc}>退出</div>
            </div>
        );
    }
}

// export default Container;
const mapStateToProps = state => ({
    info: state,
    // dictionary: state.dictionary,
});

const mapDispatchToProps = dispatch => ({
    // asyncChangeCurPage: str => dispatch(asyncChangeCurPage(str)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(UserInfo));

// export default errorBoundary(UserInfo);
