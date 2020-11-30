import { resolve } from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import common from './webpack.common';

const config = merge(common, {
	mode: 'development',
	devServer: {
		hot: true,
		historyApiFallback: true,
		port: 3000,
		open: true,
		contentBase: resolve(__dirname, '../build'),
		proxy: {
			'/': {
				target: 'http://localhost:5000',
				bypass: (req: any) =>
					req.method === 'GET' &&
					req.headers.accept?.indexOf('text/html') !== -1
						? '/index.html' // Skip proxy
						: null, // Continue with proxy
			} as any,
		},
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
});

export default config;
