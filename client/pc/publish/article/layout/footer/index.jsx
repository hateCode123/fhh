import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { rel } from '@ifeng/ui_rel';

/**
 * 定义 Footer 组件
 */
class Footer extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
        theme: PropTypes.string, // 定制皮肤class
    };

    /**
     * 渲染组件
     */
    render() {
        const {
            content: { nav, content },
            theme,
        } = this.props;

        return (
            <div className={`${styles.footer} ${theme}`}>
                <div className={`${styles.foot_link} clearfix`}>
                    <div className={styles.list}>
                        {nav.map((item, index) => (
                            <a key={index} className={styles.link} href={item.url} target="_blank" rel={rel}>
                                {item.title}
                            </a>
                        ))}
                    </div>
                </div>
                <div className={styles.copyright}>
                    <span>{content.text0}</span>
                    <span>{content.text1}</span>
                    <span>{content.text2}</span>
                </div>
            </div>
        );
    }
}

export default errorBoundary(Footer);
