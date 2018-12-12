import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * for this page
 */
// import Content from './content/';

class SwitchBtn extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {
        linkTo: '/register/inputInfo',
        linkToText: '切换至“传统入驻”模式',
    };
    UNSAFE_componentWillMount() {
        this.changeLinkTo();
    }
    getRegisterType() {
        const pathname = window.location.pathname;

        return pathname;
    }
    changeLinkTo() {
        const type = this.getRegisterType();

        if (type === '/register/inputInfoSimple') {
            this.setState({
                linkTo: '/register/inputInfo',
                linkToText: '切换至“传统入驻”模式',
            });
        } else {
            this.setState({
                linkTo: '/register/inputInfoSimple',
                linkToText: '切换至“极速入驻”模式',
            });
        }
    }

    render() {
        /**
         * 组件分发数据
         */

        const Tooltip = () => {
            const type = this.getRegisterType();

            if (type === '/register/inputInfoSimple') {
                return (
                    <p className={styles.tip}>
                        <i className={styles.tit}>个人传统入驻模式</i>
                        <i className={styles.tit_txt}>
                            “个人传统入驻”，需要填写包括真实姓名、身份证号、持身份证照片在内的全部入驻信息。
                        </i>
                        <i className={styles.tit_txt}>
                            提交申请后需要等待人工审核，通过审核后直接渡过体验期，不再受到到体验期发文数量限制。
                        </i>
                    </p>
                );
            } else if (type === '/register/inputInfo') {
                return (
                    <p className={styles.tip}>
                        <i className="tit">个人极速入驻模式</i>
                        <i className="tit_txt">“个人极速入驻”，只需填写大风号名称并绑定手机号即可完成入驻信息填写</i>
                        <i className="tit_txt">提交后无需人工审核，信息填写无误，即刻完成审核。</i>
                        <i className="tit_txt">
                            极速入驻用户，可以发布三篇文章，体验平台功能及流量扶持。在个人主页完善相关信息后，完成个人正式入驻。
                        </i>
                    </p>
                );
            } else {
                return true;
            }
        };

        return (
            <Fragment>
                <div className={styles.qh}>
                    <a href={this.state.linkTo}>{this.state.linkToText}</a>
                    <div className={styles.wen}>{Tooltip()}</div>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(SwitchBtn);
