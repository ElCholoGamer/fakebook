import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { join, resolve } from 'path';
import webpack from 'webpack';

const context = resolve(__dirname, '../');

const config: webpack.Configuration = {
	context,
	entry: join(context, 'src/app/index.tsx'),
	output: {
		filename: 'js/[name].[contenthash:8].js',
		chunkFilename: 'js/[name].[contenthash:8].chunk.js',
		path: join(context, 'build'),
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/i,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
							presets: ['@babel/env', '@babel/react', '@babel/typescript'],
							plugins: [['@babel/transform-runtime', { regenerator: true }]],
						},
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
							configFile: join(context, 'tsconfig/tsconfig.webpack.json'),
						},
					},
				],
			},
			{
				test: /\.(s[ac]|c)ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpe?g|svg|ico|gif|mp4)$/i,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'assets',
				},
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({ template: join(context, 'public/index.html') }),
		new CopyWebpackPlugin({ patterns: [{ from: 'public/' }] }),
		new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash:8].css' }),
		new CleanWebpackPlugin(),
	],
};

export default config;
