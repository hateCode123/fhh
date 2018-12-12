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
    };

    static propTypes = {
        onChange: PropTypes.func,
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
                        },
                    );
                };
            } else {
                console.error('文件过大');
            }
        }

        e.target.value = '';
    };

    preview = src => {
        // console.log(src);
        this.refs.uploader.style.background = `url(${src}) no-repeat center center`;
    };

    render() {
        console.log(this.props);
        const { onChange } = this.props;

        /**
         * 组件分发数据
         */

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
                    </div>
                    <p className={style.yy_img}>
                        <i className={style.tx_ys}>
                            <img src={epimg} />{' '}
                        </i>
                        请按参考示例进行拍摄，要求身份证号码、照片清晰可见， 大小不超过 5M
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(UplodBox);
