const path = require('path');
const webpack = require('webpack');
const getEntrys = require('./webpackUtils/getEntry');
const getHTMLs = require('./webpackUtils/getHTMLs');

const { setAlias, setJsConfig, setThirdPartCssConfig, setSelfCssConfig } = require('./webpackUtils/config');

const fileExtend = {
    pc_view: '',
    pc_edit: '_edit',
    pc_view_low: '_low',
    mobile_view: '_mobile',
    mobile_edit: '_mobile_edit',
};

const createConfig = function(type, platform, level, filepath, modern) {
    return {
        devtool: 'cheap-module-source-map',
        entry: getEntrys(platform === 'pc' ? `./client/pc/**/app.jsx` : `./client/mobile/**/app.jsx`, filepath, modern),
        output: {
            path: path.resolve(__dirname, 'devtmp'),
            filename: `js/[name]_${platform}_${type}${level ? '_' + level : ''}${modern ? '.js_' + modern : ''}.js`,
            publicPath: '/',
            chunkFilename: `js/[name]_${platform}_${type}${level ? '_' + level : ''}${modern ? '_' + modern : ''}.js`,
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx'],
            alias: setAlias(type, level),
        },
        module: {
            rules: [
                setJsConfig('dev', modern, level),
                setSelfCssConfig('dev', platform, level),
                setThirdPartCssConfig('dev'),
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 100,
                                name: 'asset/[name].[hash:8].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.ejs$/,
                    use: ['handlebars-loader'],
                },
            ],
        },
        mode: 'development',
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('development'),
                FullPagePreviewUrl: JSON.stringify(''),
                apiUrl: JSON.stringify('/api'),
            }),
            ...(modern
                ? []
                : getHTMLs(
                      platform === 'pc' ? './client/pc/**/template.ejs' : './client/mobile/**/template.ejs',
                      fileExtend[`${platform}_${type}${level ? '_' + level : ''}`],
                      level,
                      filepath,
                      'dev',
                      type,
                  )),
        ],
    };
};

let json = process.argv[process.argv.length - 1];
json = decodeURIComponent(json);
json = JSON.parse(json);
console.log(json);

let list = [];
if (json.platform.indexOf('pc') > -1 && json.type.indexOf('view') > -1) {
    list.push(createConfig('view', 'pc', '', json.path));
    list.push(createConfig('view', 'pc', '', json.path, 'modern'));
}

module.exports = list;