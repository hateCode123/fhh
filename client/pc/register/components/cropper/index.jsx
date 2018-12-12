import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import localimg from './011.jpg';

/**
 * for this page
 */
import 'cropperjs/dist/cropper.css';
import CropperModal from '../cropperModal';

class MyCropper extends React.PureComponent {
    state = {
        selectedImageFile: '',
        src: '',
        editImageModalVisible: false,
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
                            this.setState({
                                editImageModalVisible: true,
                            });
                        },
                    );
                };
            } else {
                console.error('文件过大');
            }
        }

        e.target.value = '';
    };

    handleClose = () => {
        this.setState({
            selectedImageFile: '',
            editImageModalVisible: false,
        });
    };

    preview = src => {
        // console.log(src);
        this.refs.cropperWrap.style.backgroundImage = `url(${src})`;
        const { onChange } = this.props;

        if (onChange) {
            const formValue = localimg;

            onChange(formValue);
        }
    };

    render() {
        // console.log(this.props);

        /**
         * 组件分发数据
         */

        return (
            <Fragment>
                <div className={`${style.big_tx} clearfix`}>
                    <div className={style.cropper}>
                        <div ref="cropperWrap" className={style.cropperWrap} />
                        <input
                            type="file"
                            className={style.upload}
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={this.handleFileChange}
                            title="选择文件"
                        />
                        {/* <div className={style.view}></div> */}
                    </div>
                    <p className="tx_p">
                        要求清晰、健康、代表品牌形象<br />
                        请勿使用二维码，大小不超过 5M
                    </p>
                </div>
                {/* 遮罩层 */}
                {this.state.editImageModalVisible ? (
                    <CropperModal
                        isShow={this.state.editImageModalVisible}
                        file={this.state.selectedImageFile}
                        src={this.state.src}
                        handleClose={this.handleClose}
                        preview={this.preview.bind(this)}
                    />
                ) : null}
            </Fragment>
        );
    }
}

export default errorBoundary(MyCropper);
