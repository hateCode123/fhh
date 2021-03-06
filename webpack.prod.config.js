const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const getEntrys = require('./webpackUtils/getEntry');
const getHTMLs = require('./webpackUtils/getHTMLs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
    setAlias,
    setJsConfig,
    setThirdPartCssConfig,
    setSelfCssConfig,
    setBabelLoader,
} = require('./webpackUtils/config');
const HappyPack = require('happypack');

const packageJson = require('./package.json');
const appName = packageJson.name.split('.').join('');
const env = process.env.NODE_ENV;
const os = require('os');
const useCpuCount = Math.floor(os.cpus().length / 5);
const happyThreadPool = HappyPack.ThreadPool({ size: useCpuCount > 1 ? useCpuCount : 1 });

const fileExtend = {
    pc_view: '',
    pc_view_low: '_low',
    pc_edit: '_edit',
    mobile_view: '_mobile',
    mobile_edit: '_mobile_edit',
};

const createConfig = function(type, platform, level, modern, port) {
    return {
        stats: 'errors-only',
        devtool: 'source-map',
        entry: getEntrys(platform === 'pc' ? './client/pc/**/app.jsx' : './client/mobile/**/app.jsx', '', modern),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: `[name].${platform}_${type}${level ? '_' + level : ''}.[chunkhash:8]${
                modern ? '_modern' : ''
            }.js`,
            publicPath: env === 'pre_development' ? '/' : '//p0.ifengimg.com/fe/zl/test/live/' + appName + '/',
            chunkFilename: `[name].${platform}_${type}${level ? '_' + level : ''}.[chunkhash:8]${
                modern ? '_modern' : ''
            }.js`,
        },
        resolve: {
            extensions: ['.js', '.json', '.jsx'],
            alias: setAlias(type, level),
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: os.cpus().length - 4,
                    uglifyOptions: {
                        ie8: level === '' ? false : true,
                        comments: false,
                        compress: {
                            // remove warnings
                            warnings: false,
                            // Drop console statements
                            drop_console: env === 'production' ? true : false,
                        },
                        safari10: true,
                    },
                    sourceMap: true,
                }),
            ],
            splitChunks: {
                chunks: 'all',
            },
        },
        module: {
            rules: [
                setJsConfig('build', modern, level),
                setSelfCssConfig('build', platform, level),
                setThirdPartCssConfig('build'),
                {
                    test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 100,
                                name: '[name].[hash:8].[ext]',
                            },
                        },
                    ],
                },
                {
                    test: /\.ejs$/,
                    use: ['handlebars-loader'],
                },
                // { test: /\.html$/, loader: 'handlebars-loader' },
            ],
        },
        mode: 'production',
        plugins: [
            // new BundleAnalyzerPlugin(),
            // new BundleAnalyzerPlugin({ analyzerPort: port }),
            new webpack.DefinePlugin({
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css',
                chunkFilename: '[id].[hash].css',
            }),
            new HappyPack({
                id: 'babel',
                loaders: [setBabelLoader(modern, level)],
                threadPool: happyThreadPool,
                verbose: true,
            }),
            ...getHTMLs(
                platform === 'pc' ? './client/pc/**/template.ejs' : './client/mobile/**/template.ejs',
                fileExtend[`${platform}_${type}${level ? '_' + level : ''}`],
                level,
                '',
                'build',
                type,
                modern,
            ),
        ],
    };
};

let list = [];

if (process.argv[process.argv.length - 1] === 'pc') {
    list.push(createConfig('view', 'pc', '', '', 8881));
}
if (process.argv[process.argv.length - 1] === 'pc_modern') {
    list.push(createConfig('view', 'pc', '', 'modern', 8882));
}

module.exports = list;
