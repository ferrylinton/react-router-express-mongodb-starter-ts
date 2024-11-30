const path = require('path');
const webpack = require('webpack');

module.exports = (_env, argv) => {
	return {
		entry: path.resolve(__dirname, "express", 'server.ts'),

		target: 'node',

		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'server.cjs',
		},

		watchOptions: {
			ignored: ['**/node_modules'],
		},

		resolve: {
			extensions: ['', '.ts', '.js', '.node'],
		},

		module: {
			rules: [
				{
					test: /\.ts?$/,
					loader: 'ts-loader',
					options: { configFile: 'tsconfig.server.json' },
					exclude: [
						path.resolve(__dirname, 'node_modules'),
					],
				},
			],
		},

		externals: [
			'./build/server/*',
			{ kerberos: 'commonjs kerberos' },
			{ '@mongodb-js/zstd': 'commonjs @mongodb-js/zstd' },
			{ '@aws-sdk/credential-providers': 'commonjs @aws-sdk/credential-providers' },
			{ 'gcp-metadata': 'commonjs gcp-metadata' },
			{ snappy: 'commonjs snappy' },
			{ socks: 'commonjs socks' },
			{ aws4: 'commonjs aws4' },
			{ 'mongodb-client-encryption': 'commonjs mongodb-client-encryption' },
		],

		plugins: [
			new webpack.ContextReplacementPlugin(/express/, /mongodb/)
		],
	};
};
