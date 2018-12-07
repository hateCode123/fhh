import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import geren from '../../../../images/geren.png';
import request from '../../../../../utils/request';
import touXiang from '../../../../images/df_tx.png';
import { connect } from 'react-redux';
import { actions, asyncQueryKeywords, asyncQueryPhoneNum, asyncGetValidateCode, asyncRegister } from '../../../models';
import { trimSpaceBE } from '../../../../utils/paramsUtil';
/**
 * for this page
 */
import FormTitle from '../../../../components/formTitle';
import Crooper from '../../../../components/cropper';

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
    };
    state = {
        values: {},
        phoneNumErrors: '',
        timeCount: 5,
        text: '获取验证码',
        btnDisable: false,
        subBtnDisable: false,
    };

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

    // 获取验证码
    getValidateCode = str => {
        const res = this.props.asyncGetValidateCode(str);

        return res;
    };
    clickGetCodeBtn = () => {
        const { validateFields, setFields } = this.props.form;

        if (this.state.btnDisable) {
            return true;
        }
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
                            if (timeCount === 0) {
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
        const weMediaImg = (
            <FormItem
                label={
                    <span required={true} className={style.label}>
                        大风号头像
                    </span>
                }
                colon={false}
                style={{ marginTop: '20px', marginRight: '0px' }}>
                {getFieldDecorator('weMediaImg', {
                    rules: [
                        {
                            required: true,
                            message: '请上传头像',
                        },
                    ],
                })(<Crooper />)}
            </FormItem>
        );
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
                    <Form layout="inline">
                        <div className={style.inputBox}>{weMediaName}</div>
                        {weMediaImg}
                        {operatorTelephone}
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
    uiStatus: state.inputInfo.uiStatus,
});

const mapDispatchToProps = dispatch => ({
    asyncQueryKeywords: str => dispatch(asyncQueryKeywords(str)),
    asyncQueryPhoneNum: str => dispatch(asyncQueryPhoneNum(str)),
    asyncGetValidateCode: str => dispatch(asyncGetValidateCode(str)),
    asyncRegister: () => dispatch(asyncRegister()),
    updateUiStatus: obj => dispatch(actions.changeUiStatus(obj)),
    changeRegisterValues: obj => dispatch(actions.changeRegisterValues(obj)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(errorBoundary(Form.create()(Content)));
