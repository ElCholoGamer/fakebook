import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';
import WorkboxPlugin from 'workbox-webpack-plugin';

const config = merge(common, {
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new webpack.optimize.SplitChunksPlugin(),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': 'production',
		}),
	],
});

export default config;
