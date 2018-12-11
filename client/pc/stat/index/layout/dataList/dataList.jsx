import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ToThousands from '../utils/utils';
import style from './dataList.css';

class DataList extends React.PureComponent {
    static propTypes = {
        item: PropTypes.array,
    };

    constructor() {
        super();
        this.state = {};
        console.log(this.props);
    }

    render() {
        return (
            <div className={style.sj_ul}>
                <ul>
                    {this.props.item.map((item, index) => {
                        return (
                            <li
                                key={item.title}
                                className={index === this.props.item.length - 1 ? `${style.mar_0}` : ''}>
                                <p>{ToThousands(item.num)}</p>
                                <span>{item.title}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default DataList;
