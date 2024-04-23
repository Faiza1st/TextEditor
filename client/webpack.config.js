const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

// Webpack config for development
module.exports = () => {
  return {
    mode: 'development',  // Set mode to development
    // Entry points for bundling
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // Output file and directory
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Plugins for additional functionality
    plugins: [ 
      new HtmlWebpackPlugin({ // Generates HTML file with bundled scripts
        template: './index.html',
        title: 'TextEditor'
      }),
           new InjectManifest({ // Injects service worker
            swSrc: './src-sw.js',
            swDest: 'src-sw.js',
          }),
            new WebpackPwaManifest({ // Generates manifest file for PWA
              fingerprints: false,
              inject: true,
              name: 'TextEditor text editor',
              short_name: 'TextEditor',
              description: 'text editor',
              background_color: '#225ca3',
              theme_color: '#225ca3',
              start_url: './',
              publicPath: './',
              icons: [
                {
                  src: path.resolve('src/images/logo.png'),
                  sizes: [96, 128, 192, 256, 384, 512],
                  destination: path.join('assets', 'icons'),
                },
              ],
            }),
    

      
    ],
     // Module rules for loaders
    module: {
      rules: [ 
        {
          test: /\.css$/i, // Matches .css files
          use: ['style-loader', 'css-loader'],  // Uses style and css loaders
        },
        {
          test: /\.m?js$/, // Matches .js and .mjs files
          exclude: /node_modules/, // Excludes node_modules directory
          use: {
            loader: 'babel-loader', // Uses babel-loader
            options: {
              presets: ['@babel/preset-env'], // Transpiles to ES5
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
        
      ],
    },
  };
};