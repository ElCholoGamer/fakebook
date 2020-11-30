import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config = merge(common, {
	mode: 'production',
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [new webpack.optimize.SplitChunksPlugin()],
});

export default config;
