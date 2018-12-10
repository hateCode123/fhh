import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import { connect } from 'react-redux';
import errorBoundary from '@ifeng/errorBoundary';
import img from './011.jpg';

/**
 * for this page
 */
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import CropperModal from '../cropperModal';

class MyCropper extends React.PureComponent {
    state = {
        selectedImageFile: '',
        editImageModalVisible: false,
    };

    handleFileChange = e => {
        const file = e.target.files[0];

        console.log(e.target);

        console.log(file);

        if (file) {
            const MAX_FILE_SIZE = 5242880;
            // const MAX_FILE_SIZE = 20000

            if (file.size <= MAX_FILE_SIZE) {
                this.setState(
                    {
                        selectedImageFile: img,
                    },
                    () => {
                        this.setState({
                            editImageModalVisible: true,
                        });
                    },
                );
            } else {
                console.error('文件过大');
            }
        }

        e.target.value = '';
    };

    handleClose = e => {
        this.setState({
            selectedImageFile: '',
            editImageModalVisible: false,
        });
    };

    render() {
        console.log(this.props);

        /**
         * 组件分发数据
         */

        return (
            <Fragment>
                <div className={`${style.big_tx} clearfix`}>
                    <div className={style.crooper}>
                        <div className={style.crooperWrap} />
                        <input
                            type="file"
                            className={style.upload}
                            accept="image/jpeg,image/jpg,image/png"
                            onChange={this.handleFileChange}
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
                        img={this.state.selectedImageFile}
                        handleClose={this.handleClose}
                    />
                ) : null}
            </Fragment>
        );
    }
}

export default errorBoundary(MyCropper);
