import React, { Component } from 'react';
import { rel } from '@ifeng/ui_rel';
import style from './chooseList.css';
import regiNum1 from './images/regi_01.png';
import regiNum2 from './images/regi_02.png';
import regiNum3 from './images/regi_03.png';

class ChooseList extends Component {
    state = {
        arr: [
            {
                href: '#',
                img: regiNum1,
                title: '个人自媒体',
                text: '适合垂直领域专家、意见领袖、评论家及自媒体人事申请',
            },
            {
                href: '#',
                img: regiNum2,
                title: '机构媒体自媒体',
                text: '适合报纸、杂志、电视、电台、通讯社或其他相关品牌，产品与服务等',
            },
            {
                href: '#',
                img: regiNum3,
                title: '其他组织自媒体',
                text: '适合各类公共场馆、公益机构、学校、社团、民间组织以生产内容为主的组织机构和社会组织等',
            },
        ],
    };

    render() {
        const { arr } = this.state;

        return (
            <div className={style.register_choose}>
                <ul>
                    {arr.map(item => {
                        return (
                            <li key={item.title}>
                                <a href={item.href} rel={rel} target="_blank" title="">
                                    <div className={style.tu_re}>
                                        <img src={item.img} alt={item.title} />
                                    </div>
                                    <div className={style.tu_txt}>
                                        <p>{item.title}</p>
                                        <span>{item.text}</span>
                                    </div>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ChooseList;
