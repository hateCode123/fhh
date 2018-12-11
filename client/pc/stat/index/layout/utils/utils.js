/* eslint-disable */

const ToThousands = num => {
    let result = '';
    let counter = 0;

    num = (num || 0).toString();

    for (let i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i !== 0) {
            result = ',' + result;
        }
    }

    return result;
};

export default ToThousands;
