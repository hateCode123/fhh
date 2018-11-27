import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './index.css';
import { addEventListener } from '@ifeng/ui_base';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 BottomAffix 组件
 */
class BottomAffix extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    state = {
        text: '代码/拼音/名称',
        isShow: false,
        quoteShow: false,
    };

    componentDidMount() {
        this.unHandleScroll = addEventListener(window, 'scroll', this.handleScroll);
    }

    componentWillUnmount() {
        this.unHandleScroll();
    }

    /**
     * 滚动条滚动
     */
    handleScroll = () => {
        // 兼容各主流浏览器
        const currentTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;

        if (currentTop > 100) {
            this.setState({ isShow: true });
        } else {
            this.setState({ isShow: false });
        }
    };

    /**
     * 回到顶部
     */
    backToTop = () => {
        scrollTo(0, 0);
    };

    /**
     * 渲染组件
     */
    render() {
        const { text, isShow, quoteShow } = this.state;

        const bottomAffix = (
            <div className={style.fix_top}>
                <ul>
                    <li className={style.wt}>
                        <a href="#" target="_blank" title="">
                            常见问题
                        </a>
                    </li>
                    <li className={style.fk}>
                        <a href="#" target="_blank" title="">
                            问题反馈
                        </a>
                    </li>
                    <li onClick={this.backToTop} className={style.Top} />
                </ul>
            </div>

            // <div className={styles.affix_box}>
            //     <table>
            //         <tbody>
            //             {isShow ? (
            //                 <tr>
            //                     <td>
            //                         <a onClick={this.backToTop}>
            //                             <div className={styles.back} />
            //                         </a>
            //                     </td>
            //                 </tr>
            //             ) : (
            //                 <tr />
            //             )}
            //         </tbody>
            //     </table>
            // </div>
        );

        return ReactDOM.createPortal(bottomAffix, document.body);
    }
}

export default errorBoundary(BottomAffix);
