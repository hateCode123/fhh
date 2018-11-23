const shell = require('shelljs');
const del = require('del');
const path = require('path');

// 清除dist目录
del.sync([path.join(__dirname + '/../dist/**')]);

const callback = type => {
    return (code, stdout, stderr) => {
        console.timeEnd(type);
        if (/ERROR in/gi.test(stdout)) {
            throw new Error('Webpack packaging failed, please check the front-end code! ');
        }
    };
};

console.time('pc');
console.time('pc_modern');

shell.exec('webpack --config webpack.prod.config.js --env.name pc', { async: true }, callback('pc'));
shell.exec('webpack --config webpack.prod.config.js --env.name pc_modern', { async: true }, callback('pc_modern'));
