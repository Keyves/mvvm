const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SRC_PATH = path.resolve(__dirname, 'src')
const DIST_PATH = path.resolve(__dirname, 'dist')

module.exports = {
	devServer: {
		publicPath: '/dist'
	},
	entry: {
		index: [
			'webpack/hot/only-dev-server',
			'webpack-dev-server/client?http://localhost:3000',
			'./index'
		]
	},
	output: {
		path: DIST_PATH,
		publicPath: './',
		filename: './[name].js'
	},
	module: {
		loaders: [{
			test: /.js$/,
			exclude: /node_modules/,
			loader: 'babel'
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
		new webpack.HotModuleReplacementPlugin()
	]
}
