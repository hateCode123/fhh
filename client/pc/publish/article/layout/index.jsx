import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import errorBoundary from '@ifeng/errorBoundary';
import transform from 'chipDataTransform';
import Footer from './footer';
import BottomAffix from './bottomAffix';

/**
 * for this page
 */

import Header from './header';
import Logo from './logo';
import Content from './content';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        /**
         * 组件分发数据
         */
        const { content } = this.props;

        console.log(content);

        return (
            <div className={styles.ip_col}>
                <Header />
                <Logo />
                <Content content={content} />
                <Footer content={content.footer} />
                <BottomAffix />
                <ChipEdit transform={transform} />
            </div>
        );
    }
}

export default errorBoundary(Layout);
