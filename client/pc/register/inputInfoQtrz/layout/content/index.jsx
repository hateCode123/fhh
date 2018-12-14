import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * for this page
 */
import Inputform from './inputForm';

class Content extends React.PureComponent {
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
                <div className={style.gr_bg}>
                    <div className={`${style.regi_tit} clearfix`}>
                        <span>其他组织入驻</span>
                    </div>
                    <Inputform />
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(Content);
