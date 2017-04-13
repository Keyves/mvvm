const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, 'docs')

const NODE_ENV = process.env.NODE_ENV

const config = {
    devServer: {
        hot: true,
        inline: true,
		host: '0.0.0.0',
		port: 3000,
		publicPath: '/'
    },
    stats: {
        colors: true
    },
	entry: {
		index: path.resolve(__dirname, './index.js')
	},
	output: {
		path: DIST_PATH,
		publicPath: './',
		filename: './[name].js'
	},
	module: {
		rules: [{
			test: /.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: './index.html',
			inject: 'body',
			hash: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
		})
	]
}

if (NODE_ENV === 'development') {
	config.watch = true
	config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
	config.devtool = 'inline-source-map'//'cheap-module-eval-source-map'
}


if (NODE_ENV === 'production') {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	)
}

module.exports = config
