let path = require("path");
let webpack = require("webpack");

module.exports = {
    devtool: "cheap-module-source-map",
    resolve: {
        extensions: ['.js', '.json', '.svg']
    },
    entry: {
        'mscratch-utils': ["./src/index.js"]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: "MscratchUtils",
        libraryTarget: "umd"
    },
    module: {
        rules: [{
            test: /\.js?$/,
            use: [{
                loader: "babel-loader",
                options: {
                    plugins: [
                        "transform-object-rest-spread", "transform-runtime"
                    ],
                    presets: [
                        [
                            "es2015", {
                                modules: false
                            }
                        ],
                        "stage-3"
                    ]
                }
            }],
            include: path.resolve(__dirname, "src/"),
        }]
    },
    plugins: [new webpack.optimize.UglifyJsPlugin({
        include: /\.min\.js$/,
        parallel: true,
        minimize: true
    })]
};
