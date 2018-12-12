// 参数处理部分，需要根据服务器端对于参数的接收方案来进行调整。

/* eslint-disable */
export const paramsEncode = (param, key, encode) => {
    if (param === null) return '';
    let paramStr = '';
    const t = typeof param;

    if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += `&${key}=${encode === null || !encode ? encodeURIComponent(param) : param}`;
    } else {
        for (const i in param) {
            const k = key === null || !key ? i : `${key}[${i}]`;

            paramStr += paramsEncode(param[i], k, encode);
        }
    }

    return paramStr;
};
export const arrParamsEncode = list => {
    let paramStr = '';

    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        for (const j in item) {
            const key = `${j}[${i}]`;

            paramStr += `&${key}=${encodeURIComponent(item[j])}`;
        }
    }

    return paramStr;
};

export const copyLabelToValue = temp => {
    const newTemp = temp.filter(item => item.label !== null).map(item => {
        item.value = item.label;
        if (item.children) {
            item.children = copyLabelToValue(item.children);
        }

        return item;
    });
    // console.log('newTemp==', newTemp);

    return newTemp;
};

export const cascaderValue = temp => {
    // console.log('cascaderValue---begin-', temp);
    temp.map(item => {
        item.label = item.c;
        item.value = item.c;
        item.children = item.sc.map(v => {
            return {
                label: v,
                value: v,
            };
        });
    });
    // console.log('cascaderValue==end---', temp);
    return temp;
};

export const noEmptyCheck = str => {
    // null 或者 'null'  不包括0
    if (str === null || str === undefined || str === 'null') {
        return '';
    }

    return str;
};

export const dataClean = data => {
    Object.keys(data).forEach(key => {
        data[key] = noEmptyCheck(data[key]);
    });

    return data;
};

export const trimSpaceBE = data => {
    Object.keys(data).forEach(key => {
        data[key] = typeof data[key] === 'string' ? noEmptyCheck(data[key]).trim() : data[key];
        if (data[key] === '') {
            delete data[key];
        }
    });

    return data;
};

export const strRemoveSpace = str => {
    return str.replace(' ', '');
};

export const removeRepeat = arr => {
    // var arr = [1,23,1,1,1,3,23,5,6,7,9,9,8,5];
    const ret = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr.indexOf(arr[i]) == i) {
            ret.push(arr[i]);
        }
    }

    return ret;
};

export const formatTime = time => {
    // 秒
    let t;

    if (time > -1) {
        const hour = Math.floor(time / 3600);
        const min = Math.floor(time / 60) % 60;
        const sec = time % 60;

        if (hour < 10) {
            t = `0${hour}:`;
        } else {
            t = `${hour}:`;
        }

        if (min < 10) {
            t += '0';
        }
        t += `${min}:`;
        if (sec < 10) {
            t += '0';
        }
        t += sec;
    }

    return t;
};

export const formatDuring = time => {
    // 秒
    // let days = parseInt(time / (1000 * 60 * 60 * 24));
    const hours = parseInt((time % (60 * 60 * 24)) / (60 * 60));
    const minutes = parseInt((time % (60 * 60)) / 60);
    const seconds = parseInt(time % 60);

    return `${hours} 小时 ${minutes} 分钟 ${seconds} 秒 `;
};

export const formatRequestParams = obj => {
    return `?${Object.keys(obj)
        .map(key => `${key}=${decodeURIComponent(obj[key])}`)
        .join('&')}`;
};
