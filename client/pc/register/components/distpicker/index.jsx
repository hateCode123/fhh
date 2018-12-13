import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './index.css';
import errorBoundary from '@ifeng/errorBoundary';
import { ChineseDistricts } from './distpicker.data';

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
    };

    static propTypes = {
        onChange: PropTypes.func,
    };

    onChange = this.props.onChange;
    UNSAFE_componentWillMount() {
        // console.log(ChineseDistricts[86])
        const provinceArr = this.formatObj(ChineseDistricts[86]);
        // console.log(provinceArr);

        this.setState(
            {
                province: provinceArr,
            },
            () => {
                const defaultValueP = '天津市';

                const defaultValueC = '天津市市辖区';

                this.setState({
                    provinceSelected: '天津市',
                });
                const cityKey = this.getKey(defaultValueP, provinceArr);

                // console.log(cityKey);
                const cityArr = this.formatObj(ChineseDistricts[cityKey]);

                this.setState(
                    {
                        city: cityArr,
                    },
                    () => {
                        this.setState({
                            citySelected: defaultValueC,
                        });
                        const param = this.handleLocaiton(defaultValueP, defaultValueC);

                        this.onChange(param);
                    },
                );
            },
        );
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

                newArr.push(newObj);
            }
        }

        return newArr;
    };
    // 当选择省级时
    handleProvince = e => {
        let value = e.target.value;

        // console.log(value);
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
                        city: cityArr,
                        citySelected: cityArr[0].value,
                    });

                    const param = this.handleLocaiton(value, cityArr[0].value);

                    this.onChange(param);
                }
            },
        );
    };
    // 当选择市级时
    handleCity = e => {
        let value = e.target.value;

        // console.log(value);
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
        const param = province + city;

        console.log(param);

        return param;
    };

    render() {
        // console.log(this.props);

        /**
         * 组件分发数据
         */
        const provinceOptions = this.state.province.map(item => {
            return (
                <option value={item.value} key={item.value}>
                    {item.value}
                </option>
            );
        });
        const cityOptions = this.state.city.map(item => {
            return (
                <option value={item.value} key={item.value}>
                    {item.value}
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
