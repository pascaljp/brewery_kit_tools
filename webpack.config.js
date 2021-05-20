const path = require('path');
// const nodeExternals = require('webpack-node-externals');
const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

module.exports = [
  {
    mode: 'development',
    entry: './maintenance/index.ts',
    target: 'node',
    // externals: [nodeExternals()],
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: [
        {
          loader: 'ts-loader',
          test: /\.ts$/,
          exclude: [/node_modules/],
          options: {
            configFile: 'tsconfig.json',
          },
        },
      ],
    },
    resolve: {
      plugins: [new TsConfigPathsPlugin()],
      extensions: ['.ts', '.js'],
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'index.js',
    },
    cache: false,
  },
];
