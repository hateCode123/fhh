import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import geren from '../../../../images/geren.png';
import request from '../../../../../utils/request';
import touXiang from '../../../../images/df_tx.png';
import { connect } from 'react-redux';
import {
    actions,
    asyncQueryKeywords,
    asyncQueryPhoneNum,
    asyncGetValidateCode,
    asyncRegister,
    changeWeMediaImg,
} from '../../../models';
import { trimSpaceBE } from '../../../../utils/paramsUtil';
/**
 * for this page
 */
import FormTitle from '../../../../components/formTitle';

import Form from 'antd/lib/form';
import 'antd/lib/form/style/index.css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import CheckBox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/index.css';
const FormItem = Form.Item;

class Content extends React.PureComponent {
    static propTypes = {
        form: PropTypes.object,
        asyncQueryKeywords: PropTypes.func,
        asyncGetValidateCode: PropTypes.func,
        updateUiStatus: PropTypes.func,
        changeRegisterValues: PropTypes.func,
        asyncRegister: PropTypes.func,
        changeWeMediaImg: PropTypes.func,
    };
    state = {
        values: {},
        phoneNumErrors: '',
        timeCount: 5,
        text: '获取验证码',
        btnDisable: false,
        subBtnDisable: false,
        profilePhoto: touXiang,
    };

    componentDidMount() {
        this.getProfilePhotoAtRandom();
    }

    // 校验用户名关键字
    handleKeywords = async (rule, value, callback) => {
        const { getFieldValue } = this.props.form;

        const weMediaName = getFieldValue('weMediaName');

        console.log(weMediaName);
        if (weMediaName) {
            const result = await this.props.asyncQueryKeywords(weMediaName);

            console.log(result);
            if (result) {
                callback(result);
            }
        }
    };
    // 校验手机号
    handlePhoneNum = async (rule, value, callback) => {
        const { getFieldValue } = this.props.form;

        const operatorTelephone = getFieldValue('operatorTelephone');

        if (operatorTelephone) {
            // const result = await this.props.asyncQueryPhoneNum(operatorTelephone);
            const result = '';

            console.log(result);
            if (result) {
                callback(result);
            }
        }
    };

    // 获取随机头像
    getProfilePhotoAtRandom = () => {
        const imgs = [
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/e1d0abe9465282csize12_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/2fd0dd7cc4d985fsize15_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/e254309fbee7b8dsize10_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/c966ef1a76468fasize18_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/7f24e8621b1d25dsize9_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/e8c22a3022cd7dbsize25_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/62e81de444b4acasize7_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/47c75c084ab4391size18_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/e254309fbee7b8dsize10_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/75b5f8f888f0271size11_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/0e6ffae328318e3size7_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/017c989b75b3649size73_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/dcd01c50b757300size9_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/9a463dcb4d548a9size9_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/67e4c4c5122dc6csize9_w200_h200.jpg',
            'http://d.ifengimg.com/w100_h100/p0.ifengimg.com/a/2018/0822/ce51d408cee5fe4size6_w200_h200.jpg',
        ];

        const getIndexAtRandom = arr => {
            let num = '';

            if (arr.length !== 0) {
                num = Math.floor(Math.random() * arr.length);
            }

            return num;
        };

        let img = imgs[getIndexAtRandom(imgs)];

        if (img) {
            this.setState(
                {
                    profilePhoto: img,
                },
                () => {
                    this.props.changeWeMediaImg(this.state.profilePhoto);
                },
            );
        }
    };

    // 获取验证码
    getValidateCode = str => {
        const res = this.props.asyncGetValidateCode(str);

        return res;
    };
    // 点击获取验证码按钮
    clickGetCodeBtn = () => {
        const { validateFields, setFields } = this.props.form;

        if (this.state.btnDisable) {
            return true;
        }
        // 同时验证手机号
        validateFields(['operatorTelephone'], (errors, values, callback) => {
            if (!errors) {
                this.props.updateUiStatus({ isCountdown: true });
                let timeCount = this.state.timeCount;

                console.log(timeCount);
                const timer = setInterval(() => {
                    this.setState(
                        {
                            timeCount: timeCount--,
                            text: `${timeCount}秒后重新获取`,
                            btnDisable: true,
                        },
                        () => {
                            if (timeCount < 0) {
                                clearInterval(timer);
                                this.setState({
                                    timeCount: 60,
                                    text: '重新获取',
                                    btnDisable: false,
                                });
                                this.props.updateUiStatus({ isCountdown: false });
                            }
                        },
                    );
                }, 1000);
                const phoneNum = values.operatorTelephone;

                const res = this.getValidateCode(phoneNum);

                // console.log(res);

                if (res) {
                    this.props.form.setFields({
                        operatorTelephone: {
                            value: values.operatorTelephone,
                            errors: [new Error(res)],
                        },
                    });
                }
            }
        });
    };
    // 提交功能
    handleSubmmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            const value = trimSpaceBE(fieldsValue);

            console.log(value);
            if (!fieldsValue.agree) {
                return;
            }
            if (!err) {
                this.props.changeRegisterValues(value);
                this.props.asyncRegister();
            }
        });
    };

    render() {
        /**
         * 组件分发数据
         */
        // console.log(this.props);
        // const { defaultValue, errors } = this.state;
        const { getFieldDecorator, getFieldsError } = this.props.form;
        const errors = getFieldsError(['operatorTelephone', 'validateCode']);
        const { profilePhoto } = this.state;

        console.log(errors);

        const formItemConfig = {
            rules: [
                {
                    required: true,
                    message: '您输入的名称不符合长度限制',
                },
                {
                    pattern: /^[\u4e00-\u9fa5]{1,12}$|^[\dA-Za-z_]{2,24}$/,
                    message: '您输入的名称不符合长度限制',
                },
                {
                    validator: this.handleKeywords,
                },
            ],
        };
        // 大风号名称
        const weMediaName = (
            <FormItem
                label={
                    <span required={true} className={style.label}>
                        大风号名称
                    </span>
                }
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('weMediaName', { ...formItemConfig, validateTrigger: 'onBlur' })(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                        placeholder="限制1-12个汉字，请勿使用标点、特殊符号以及敏感词等"
                    />,
                )}
            </FormItem>
        );
        // 绑定手机号/验证码
        const operatorTelephone = (
            <Fragment>
                <div className={style.inputBox}>
                    {/* <div className={style.required} /> */}
                    <FormItem
                        label={
                            <span required={true} className={style.label}>
                                绑定手机号
                            </span>
                        }
                        colon={false}
                        style={{ marginRight: '0px' }}>
                        {getFieldDecorator('operatorTelephone', {
                            rules: [
                                {
                                    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
                                    message: '手机号输入有误',
                                },
                                {
                                    required: true,
                                    message: '请输入有效手机号',
                                },
                                {
                                    validator: this.handlePhoneNum,
                                },
                            ],
                            validateTrigger: 'onBlur',
                        })(
                            <Input
                                style={{
                                    width: '548px',
                                    height: '36px',
                                }}
                                placeholder="请输入手机号"
                            />,
                        )}
                    </FormItem>
                </div>
                <FormItem
                    label={<span required={true} className={style.label} />}
                    colon={false}
                    style={{ marginRight: '0px' }}>
                    {getFieldDecorator('validateCode', {
                        // rules: [{}],
                        validateTrigger: 'onBlur',
                    })(
                        <Input
                            style={{
                                width: '396px',
                                height: '36px',
                                marginLeft: '11px',
                            }}
                            placeholder="请输入验证码"
                        />,
                    )}
                </FormItem>
                {/* {this.state.phoneNumErrors !== '' ? <ErrorTip text={this.state.phoneNumErrors} /> : null} */}
            </Fragment>
        );

        return (
            <Fragment>
                <div className={`${style.xx_register} clearfix`}>
                    <FormTitle />
                    {/* 类型 */}
                    <div className={`${style.lx} clearfix`}>
                        <span>类型</span>
                        <div className={style.lx_t}>
                            <img src={geren} />个人自媒体{' '}
                        </div>
                    </div>
                    {/* 头像 */}
                    <div className={`${style.df_tx} clearfix`}>
                        <span>大风号头像</span>
                        <div className={style.big_tx}>
                            <img src={profilePhoto} />
                            <p>
                                极速入驻后的体验期，个人头像均为随机头像。<br />
                                正式入驻后，用户可修改头像。
                            </p>
                        </div>
                    </div>
                    <Form layout="inline">
                        <div className={style.inputBox}>{weMediaName}</div>
                        {operatorTelephone}
                        {/* <GetValidateCode onClick={this.clickGetCodeBtn.bind(this)} /> */}
                        {/* <div className={style.btn}>获取验证码</div> */}
                        <button ref={'btn'} className={style.btn} onClick={this.clickGetCodeBtn.bind(this)}>
                            {this.state.text}
                        </button>
                        <div className={style.tongyi}>
                            <div className={style.btn_ty}>
                                <FormItem>{getFieldDecorator('agree', {})(<CheckBox />)}</FormItem>
                            </div>
                            <p>
                                同意并遵守<a href="#" target="_blank">
                                    《凤凰号媒体开放平台使用协议》
                                </a>
                            </p>
                        </div>
                        <div className={style.btn_sq} onClick={this.handleSubmmit}>
                            提交申请
                        </div>
                    </Form>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = state => ({
    uiStatus: state.inputInfoSimple.uiStatus,
});

const mapDispatchToProps = dispatch => ({
    asyncQueryKeywords: str => dispatch(asyncQueryKeywords(str)),
    asyncQueryPhoneNum: str => dispatch(asyncQueryPhoneNum(str)),
    asyncGetValidateCode: str => dispatch(asyncGetValidateCode(str)),
    asyncRegister: () => dispatch(asyncRegister()),
    updateUiStatus: obj => dispatch(actions.changeUiStatus(obj)),
    changeRegisterValues: obj => dispatch(actions.changeRegisterValues(obj)),
    changeWeMediaImg: str => dispatch(actions.changeWeMediaImg(str)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Form.create()(Content)));
