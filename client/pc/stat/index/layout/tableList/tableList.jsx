import React, { Fragment } from 'react';
import ToThousands from '../utils/utils';
import ExportJsonExcel from 'js-export-excel';
import style from './tableList.css';

class TableList extends React.PureComponent {
    constructor(props) {
        super();
    }

    static propTypes = {
        TabledateJson: this.props,
    };

    ExcelJson = () => {
        const option = {};

        option.fileName = 'excel';
        option.datas = this.props.TabledateJson;
        const toExcel = new ExportJsonExcel(option);

        toExcel.saveExcel();
    };

    render() {
        return (
            <div className={style.dc}>
                <a className={style.dc_shuju} onClick={() => this.ExcelJson()}>
                    导出Excel
                </a>
                <table className={style.tableDesin} cellPadding={0} cellSpacing={0}>
                    <tbody>
                        <tr className={style.bg}>
                            <td>日期</td>
                            <td>发布数</td>
                            <td>推荐量</td>
                            <td>阅读数</td>
                            <td>评论数</td>
                            <td>分享数</td>
                            <td>收藏数</td>
                            <td>粉丝数</td>
                        </tr>
                        {this.props.TabledateJson[0].sheetData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.data}</td>
                                    <td>{item.fabu}</td>
                                    <td className={style.sj}>{ToThousands(item.Recommend)}</td>
                                    <td className={style.sj}>{item.Read}</td>
                                    <td>{ToThousands(item.comment)}</td>
                                    <td className={style.sj}>{ToThousands(item.share)}</td>
                                    <td className={style.sj}>{ToThousands(item.Collection)}</td>
                                    <td>{item.fans}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TableList;
