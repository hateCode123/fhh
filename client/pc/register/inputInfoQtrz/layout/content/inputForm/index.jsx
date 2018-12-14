import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import geren from '../../../../images/jigou.png';
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
import UplodBox from '../../../../components/uploadBox';
import Distpicker from '../../../../components/distpicker';

import Form from 'antd/lib/form';
import 'antd/lib/form/style/index.css';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';
import CheckBox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style/index.css';
import Select from 'antd/lib/select';
import 'antd/lib/select/style/index.css';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class Content extends React.PureComponent {
    static propTypes = {
        form: PropTypes.object,
        asyncQueryKeywords: PropTypes.func,
        asyncGetValidateCode: PropTypes.func,
        updateUiStatus: PropTypes.func,
        changeRegisterValues: PropTypes.func,
        asyncRegister: PropTypes.func,
    };
    state = {
        values: {},
        phoneNumErrors: '',
        timeCount: 5,
        text: '获取验证码',
        btnDisable: false,
        subBtnDisable: false,
    };
    // 校验关键字
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
        // 大风号名
        const weMediaName = (
            <FormItem
                label={<span className={style.label}>大风号名称</span>}
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
        // 大风号头像
        const weMediaImg = (
            <FormItem
                label={<span className={style.label}>大风号头像</span>}
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
        // 专注领域
        const categoryIdOptionData = [
            { label: '测试1', value: 1 },
            { label: '测试2', value: 2 },
            { label: '测试3', value: 3 },
        ];
        const categoryIdOption = categoryIdOptionData.map(item => {
            return (
                <Option value={item.value} key={item.value}>
                    {item.label}
                </Option>
            );
        });
        const categoryId = (
            <FormItem
                label={<span className={style.label}>大风号头像</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('categoryId', {
                    rules: [
                        {
                            required: true,
                            message: '请选择专注领域',
                        },
                    ],
                })(
                    <Select
                        style={{
                            width: '548px',
                            height: '40px',
                        }}
                        placeholder={'请选择'}>
                        {categoryIdOption}
                    </Select>,
                )}
            </FormItem>
        );
        // 简介
        const weMediaDescription = (
            <FormItem
                label={<span className={style.label}>大风号简介</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('weMediaDescription', {
                    rules: [
                        {
                            required: true,
                            message: '请输入大风号简介',
                        },
                    ],
                    validateTrigger: 'onBlur',
                })(
                    <TextArea
                        style={{
                            width: '548px',
                            height: '100px',
                        }}
                        placeholder="10-30 个汉字，请简要地介绍您的大风号，请勿添加任何联系方式！"
                    />,
                )}
            </FormItem>
        );
        // 姓名
        const operatorName = (
            <FormItem
                label={<span className={style.label}>运营者姓名</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('operatorName', {
                    rules: [
                        {
                            required: true,
                            message: '请输入运营者姓名',
                        },
                    ],
                    validateTrigger: 'onBlur',
                })(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                        placeholder="请输入姓名"
                    />,
                )}
            </FormItem>
        );
        // 有效证件号
        const idCard = (
            <FormItem
                label={<span className={style.label}>有效证件号</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('idCard', {
                    rules: [
                        {
                            required: true,
                            message: '请输入有效证件号',
                        },
                    ],
                    validateTrigger: 'onBlur',
                })(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                        placeholder="身份证号或护照"
                    />,
                )}
            </FormItem>
        );
        // 运营者身份证照片
        const idCardImg = (
            <FormItem
                label={<span className={style.label}>运营者身份证照片</span>}
                colon={false}
                style={{ marginTop: '40px', marginRight: '0px' }}>
                {getFieldDecorator('idCardImg', {
                    rules: [
                        {
                            required: true,
                            message: '请上传有效证件照片',
                        },
                    ],
                })(<UplodBox type={1} />)}
            </FormItem>
        );
        // 手机号相关
        const operatorTelephone = (
            <Fragment>
                <div className={style.inputBox_mt20}>
                    {/* <div className={style.required} /> */}
                    <FormItem
                        label={<span className={style.label}>绑定手机号</span>}
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
                <FormItem label={<span className={style.label} />} colon={false} style={{ marginRight: '0px' }}>
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
        // 运营所在地
        const operatorAddress = (
            <FormItem
                label={<span className={style.label}>运营所在地</span>}
                colon={false}
                style={{ marginTop: '20px', marginRight: '0px' }}>
                {getFieldDecorator('operatorAddress', {
                    rules: [
                        {
                            required: true,
                            message: '请选择运营所在地',
                        },
                    ],
                })(<Distpicker />)}
            </FormItem>
        );
        // 邮箱
        const operatorMail = (
            <FormItem
                label={<span className={style.label_norequired}>联系邮箱</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('operatorMail', {})(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                    />,
                )}
            </FormItem>
        );
        // 备注信息
        const otherContacts = (
            <FormItem
                label={<span className={style.label_norequired}>备注信息</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('otherContacts', {})(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                        placeholder="请输入备注信息"
                    />,
                )}
            </FormItem>
        );

        // 媒体名称
        const organizationName = (
            <FormItem
                label={<span className={style.label}>媒体名称</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('organizationName', {
                    rules: [
                        {
                            required: true,
                            message: '请输入媒体名称',
                        },
                    ],
                    validateTrigger: 'onBlur',
                })(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                        placeholder="请输入媒体名称"
                    />,
                )}
            </FormItem>
        );
        // 媒体地址
        const organizationAddress = (
            <FormItem
                label={<span className={style.label}>媒体地址</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('organizationAddress', {
                    rules: [
                        {
                            required: true,
                            message: '请输入媒体地址',
                        },
                    ],
                    validateTrigger: 'onBlur',
                })(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                        placeholder="请输入媒体地址"
                    />,
                )}
            </FormItem>
        );
        // 媒体机构代码证
        const mediaCodePic = (
            <FormItem
                label={<span className={style.label}>媒体机构代码证</span>}
                colon={false}
                style={{ marginTop: '40px', marginRight: '0px' }}>
                {getFieldDecorator('mediaCodePic', {
                    rules: [
                        {
                            required: true,
                            message: '请上传媒体机构代码证照片',
                        },
                    ],
                })(<UplodBox type={3} />)}
            </FormItem>
        );
        // 合同授权书
        const contractPic = (
            <FormItem
                label={<span className={style.label}>合同授权书</span>}
                colon={false}
                style={{ marginTop: '40px', marginRight: '0px' }}>
                {getFieldDecorator('contractPic', {
                    rules: [
                        {
                            required: true,
                            message: '请上传合同授权书照片',
                        },
                    ],
                })(<UplodBox type={4} />)}
            </FormItem>
        );
        // 官方网站
        const officialWebsite = (
            <FormItem
                label={<span className={style.label_norequired}>官方网站</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('officialWebsite', {})(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                    />,
                )}
            </FormItem>
        );
        // 材料证明
        const materialCertificateImg = (
            <FormItem
                label={<span className={style.label_norequired}>材料证明</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('contractPic', {})(<UplodBox type={2} />)}
            </FormItem>
        );
        // 入住邀请码
        const invitationCode = (
            <FormItem
                label={<span className={style.label_norequired}>入驻邀请码</span>}
                colon={false}
                style={{ marginRight: '0px' }}>
                {getFieldDecorator('invitationCode', {})(
                    <Input
                        style={{
                            width: '548px',
                            height: '36px',
                        }}
                    />,
                )}
            </FormItem>
        );

        return (
            <Fragment>
                <div className={`${style.xx_register} clearfix`}>
                    <FormTitle />
                    {/* 类型 */}
                    <div className={`${style.lx} clearfix`}>
                        <span>类型</span>
                        <div className={style.lx_t}>
                            <img src={geren} />其他组织自媒体{' '}
                        </div>
                    </div>
                    <Form layout="inline">
                        {/* 大风号名 */}
                        <div className={style.inputBox_weMediaName}>{weMediaName}</div>
                        {/* 头像 */}
                        <div className={style.touxiangBox}>{weMediaImg}</div>

                        {/* 专注领域 */}
                        <div className={style.inputBox_mt20}>{categoryId}</div>
                        {/* 简介 */}
                        <div className={style.textAeraBox}>{weMediaDescription}</div>

                        {/* 运营者信息 */}
                        <h3 className={style.yy_info}>运营者信息</h3>
                        {/* 姓名 */}
                        <div className={style.inputBox_mt10}>{operatorName}</div>
                        {/* 有效证件 */}
                        <div className={style.inputBox}>{idCard}</div>
                        {/* 证件图片 */}
                        <div className={style.zhnegjianBox}>{idCardImg}</div>
                        {/* 手机号相关 */}
                        <div className={style.mt_30}>
                            {operatorTelephone}
                            <button ref={'btn'} className={style.btn} onClick={this.clickGetCodeBtn.bind(this)}>
                                {this.state.text}
                            </button>
                        </div>

                        {/* 所在地 */}
                        <div className={style.inputBox_mt20}>{operatorAddress}</div>
                        {/* 邮箱 */}
                        <div className={style.inputBox_mt30}>{operatorMail}</div>
                        {/* 备注 */}
                        <div className={style.inputBox_mt10}>{otherContacts}</div>

                        {/* 其他信息 */}
                        <h3 className={style.yy_info}>其他信息</h3>
                        {/* 媒体名称 */}
                        <div className={style.inputBox_mt10}>{organizationName}</div>
                        {/* 媒体地址 */}
                        <div className={style.inputBox_mt10}>{organizationAddress}</div>
                        {/* 媒体或组织机构代码证 */}
                        <div>{mediaCodePic}</div>
                        {/* 合同授权书 */}
                        <div>{contractPic}</div>
                        {/* 官方网站 */}
                        <div className={style.inputBox_mt30}>{officialWebsite}</div>
                        {/* 材料证明 */}
                        <div>{materialCertificateImg}</div>
                        {/* 邀请码 */}
                        <div className={style.inputBox_mt30}>{invitationCode}</div>

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
    uiStatus: state.inputInfoQtrz.uiStatus,
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
