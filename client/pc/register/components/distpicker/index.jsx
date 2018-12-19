import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { ChineseDistricts } from './distpicker.data';
import { request } from '../../../utils/';

/**
 * for this page
 */
import 'cropperjs/dist/cropper.css';
import CropperModal from '../cropperModal';

class Distpicker extends React.PureComponent {
    state = {
        province: [],
        city: [],
        provinceSelected: '',
        citySelected: '',
        defaultAdress: {},
    };

    static propTypes = {
        onChange: PropTypes.func,
        // defaultAdress: PropTypes.object,
    };

    onChange = this.props.onChange;

    asyncGetLocation = async () => {
        const result = await request('/napi/account/addressByIp', { data: {}, type: 'get' });
        // const result = await {
        //     data: {
        //         province: '河北省',
        //         city: '石家庄市',
        //     },
        //     status: 'success',
        //     code: 1000,
        //     message: '',
        // };

        if (result.code === 1000) {
            console.log('获取地址');

            return result.data;
        }

        return result.data;
    };

    getLocation() {
        const res = this.asyncGetLocation();

        return res;
    }

    async componentDidMount() {
        // console.log(ChineseDistricts[86])
        const provinceArr = this.formatObj(ChineseDistricts[86]);

        const defaultAdress = await this.getLocation();

        this.setState(
            {
                province: [{ key: 100000, value: '', label: '请选择' }, ...provinceArr],
            },
            () => {
                const defaultValueP = defaultAdress.province || '';
                const defaultValueC = defaultAdress.city || '';

                console.log(defaultValueP);
                const has = this.checkDefaultValue(defaultValueP, provinceArr);

                console.log(has);

                this.setState({
                    provinceSelected: has ? defaultValueP : '',
                });
                const cityKey = this.getKey(defaultValueP, provinceArr);

                // console.log(cityKey);
                const cityArr = this.formatObj(ChineseDistricts[cityKey]);

                this.setState(
                    {
                        city: [{ key: 100000, value: '', label: '请选择' }, ...cityArr],
                    },
                    () => {
                        this.setState({
                            citySelected: has ? defaultValueC : '',
                        });
                        const param = this.handleLocaiton(has ? defaultValueP : '', has ? defaultValueC : '');

                        this.onChange(param);
                    },
                );
            },
        );
    }

    checkDefaultValue(str, arr) {
        const newArr = arr.filter(item => {
            return item.value === str;
        });

        console.log(newArr);

        return newArr.length > 0;
    }

    getKey = (str, arr) => {
        let thekey = '';

        arr.map(item => {
            if (item.value === str) {
                thekey = item.key;
            }

            return true;
        });

        return thekey;
    };

    formatObj = obj => {
        let newArr = [];

        for (const key in obj) {
            let newObj = {};

            if (obj.hasOwnProperty(key)) {
                newObj.key = Number(key);
                newObj.value = obj[key];
                newObj.label = obj[key];

                newArr.push(newObj);
            }
        }

        return newArr;
    };
    // 当选择省级时
    handleProvince = e => {
        let value = e.target.value;

        // console.log(value);
        if (value) {
            this.setState(
                {
                    provinceSelected: value,
                },
                () => {
                    const cityKey = this.getKey(value, this.state.province);

                    // console.log(cityKey);
                    const cityArr = this.formatObj(ChineseDistricts[cityKey]);

                    console.log(cityArr);

                    if (cityArr[0]) {
                        this.setState({
                            city: [{ key: 100000, value: '', label: '请选择' }, ...cityArr],
                            citySelected: cityArr[0].value,
                        });

                        const param = this.handleLocaiton(value, cityArr[0].value);

                        this.onChange(param);
                    }
                },
            );
        } else {
            this.setState({
                city: [{ key: 100000, value: '', label: '请选择' }],
                provinceSelected: '',
                citySelected: '',
            });
            this.onChange('');
        }
    };
    // 当选择市级时
    handleCity = e => {
        let value = e.target.value;

        // console.log(value);
        // if (!value) {
        //     return false;
        // }
        this.setState(
            {
                citySelected: value,
            },
            () => {
                const province = this.state.provinceSelected;

                const param = this.handleLocaiton(province, value);

                this.onChange(param);
            },
        );
    };

    handleLocaiton = (province, city) => {
        let param = '';

        if (province) {
            param = `${province}${city}`;
        }

        console.log(param);

        return param;
    };

    render() {
        console.log(this.props);

        /**
         * 组件分发数据
         */
        const provinceOptions = this.state.province.map(item => {
            return (
                <option value={item.value} key={item.value}>
                    {item.label}
                </option>
            );
        });
        const cityOptions = this.state.city.map(item => {
            return (
                <option value={item.value} key={item.value}>
                    {item.label}
                </option>
            );
        });

        return (
            <Fragment>
                <div className={`${style.big_tx} clearfix`}>
                    <div className={style.selectWrap}>
                        <select
                            ref="province"
                            value={this.state.provinceSelected}
                            className={style.select}
                            onChange={this.handleProvince.bind(this)}>
                            {provinceOptions}
                        </select>
                    </div>
                    <div className={style.selectWrap} style={{ marginLeft: '10px' }}>
                        <select className={style.select} value={this.state.citySelected} onChange={this.handleCity}>
                            {cityOptions}
                        </select>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default errorBoundary(Distpicker);
