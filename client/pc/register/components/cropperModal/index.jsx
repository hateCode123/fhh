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

class cropperModal extends React.PureComponent {
    state = {
        selectedImageFile: img,
        editImageModalVisible: false,
    };

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps !== this.props) {
            this.setState({
                editImageModalVisible: nextProps.isShow,
            });
        }
    }

    componentDidMount() {
        console.log(this.refs);
    }

    componentWillMount() {
        // console.log(this.props)
        const { file } = this.props;
        const fileReader = new FileReader();
        fileReader.onload = e => {
            // const dataUrl =
        };
    }

    handleClose = e => {
        this.setState({
            editImageModalVisible: false,
        });
        // console.log(this.refs.cropper.getCropBoxData());
        this.props.handleClose();
    };
    handleSubmmit = e => {};

    render() {
        console.log(this.props);

        /**
         * 组件分发数据
         */

        return (
            <Fragment>
                <div className={style.mask}>
                    <div className={style.modal}>
                        <div className={style.clipArea}>
                            <Cropper
                                src={this.state.selectedImageFile}
                                // className="company-logo-cropper"
                                style={{ height: 480, width: '100%' }}
                                ref={'cropper'}
                                // Cropper.js options
                                // zoomable={true}
                                aspectRatio={1}
                                guides={false}
                                viewMode={1}
                                dragMode={'move'}
                                cropBoxMovable={false}
                                cropBoxResizable={false}
                                // movable={true}
                            />
                        </div>
                        <div className={style.btnWrap}>
                            <button className={style.clipBtn} onClick={this.handleSubmmit.bind(this)}>
                                保存封面
                            </button>
                            <div className={style.close_upload} id="close_upload" onClick={this.handleClose.bind(this)}>
                                取消
                            </div>
                            <div className={style.touch_ts}>滑动滚轮可进行缩放</div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(cropperModal);
