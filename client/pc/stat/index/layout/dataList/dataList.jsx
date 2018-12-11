import React, { Fragment } from 'react';
import ToThousands from '../utils/utils';
import style from './dataList.css';

class DataList extends React.PureComponent {
    constructor() {
        super();
        this.state = {};
    }

    static propTypes = {
        item: this.props,
    };

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
