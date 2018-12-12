import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * for this page
 */

class FormTitle extends React.PureComponent {
    state = {
        title: '账号信息',
    };
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    UNSAFE_componentWillMount() {
        this.changeTitle();
    }
    getRegisterType() {
        const pathname = window.location.pathname;

        return pathname;
    }
    changeTitle() {
        const type = this.getRegisterType();

        if (type === '/register/inputInfoSimple') {
            this.setState({
                title: '基本信息',
            });
        }
    }

    render() {
        /**
         * 组件分发数据
         */
        // const { content } = this.props;

        return (
            <Fragment>
                <h3 className={style.title}>{this.state.title}</h3>
            </Fragment>
        );
    }
}

export default errorBoundary(FormTitle);
