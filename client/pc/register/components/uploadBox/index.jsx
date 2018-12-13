import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import epimg from './tx_ys.png';

/**
 * for this page
 */

class UplodBox extends React.PureComponent {
    state = {
        selectedImageFile: '',
        src: '',
        errorTipShow: false,
        errorMsg: '',
    };

    static propTypes = {
        type: PropTypes.number,
        onChange: PropTypes.func,
        downloadUrl: PropTypes.string,
    };

    handleFileChange = e => {
        const file = e.target.files[0];

        // console.log(file);

        if (file) {
            const MAX_FILE_SIZE = 5242880;
            // const MAX_FILE_SIZE = 20000

            if (file.size <= MAX_FILE_SIZE) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(file);

                let img = '';

                fileReader.onload = e => {
                    img = e.target.result;
                    this.setState(
                        {
                            selectedImageFile: file,
                            src: img,
                        },
                        () => {
                            this.preview(this.state.src);
                            this.onChangeHandle();
                            this.errorTip('上传失败');
                        },
                    );
                };
            } else {
                console.error('文件过大');
                this.errorTip('文件过大');
            }
        }

        e.target.value = '';
    };

    preview = src => {
        // console.log(src);
        this.refs.uploader.style.background = `url(${src}) no-repeat center center`;
        this.refs.uploader.style.backgroundSize = '120px 120px';
    };

    errorTip = error => {
        if (error) {
            this.setState({
                errorTipShow: true,
                errorMsg: error,
            });
        }
    };

    onChangeHandle = src => {
        const { onChange } = this.props;

        if (onChange) {
            const formValue = epimg;

            onChange(formValue);
        }
    };

    stopDefault = e => {
        if (e & e.preventDefault) {
            e.preventDefault();
        }
    };

    render() {
        // console.log(this.props);
        const { type, downloadUrl } = this.props;

        /**
         * 组件分发数据
         */
        const tip = type => {
            if (type === 1) {
                return (
                    <p className={style.yy_img}>
                        <i className={style.tx_ys}>
                            <img src={epimg} />{' '}
                        </i>
                        请按参考示例进行拍摄，要求身份证号码、照片清晰可见， 大小不超过 5M
                    </p>
                );
            } else if (type === 2) {
                return (
                    <p className={style.yy_img}>
                        请提供图片形式的证明（如您的专栏、微博、微信公众号
                        等后台管理页面截图），如在微信公众号、今日头条号已
                        获得原创证明，可直接上传相关证明截图，将一并审核开 通“原创”功能，大小不超过 5M
                    </p>
                );
            } else if (type === 3) {
                return <p className={style.yy_img}>请上传组织机构代码证，确保信息清晰可见，大小不超过5M</p>;
            } else if (type === 4) {
                return (
                    <p className={style.yy_img}>
                        填写并加盖公司红章后扫描上传，大小不超过 5M<br />
                        <a href={downloadUrl} onClick={this.stopDefault} className={style.downloadUrl}>
                            合同授权书下载
                        </a>
                    </p>
                );
            } else {
                return null;
            }
        };

        return (
            <Fragment>
                <div className={`${style.big_tx} clearfix`}>
                    <div className={style.uploadWrap}>
                        <div ref="uploader" className={style.uploadContainer}>
                            <input
                                type="file"
                                accept="image/jpeg,image/jpg,image/png"
                                onChange={this.handleFileChange}
                            />
                        </div>

                        {this.state.errorTipShow ? (
                            <div className={style.errorTip}>
                                <span>上传失败</span>
                            </div>
                        ) : null}
                    </div>
                    {tip(type)}
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(UplodBox);
