/* eslint-disable */
const JavaScriptObfuscator = require('webpack-obfuscator');
const HOST = process.env.NODE_ENV;
module.exports = {
    webpack: {
        configure: {
            plugins:
                HOST !== 'development'
                    ? [
                          new JavaScriptObfuscator(
                              {
                                  rotateStringArray: true,
                              },
                              []
                          ),
                      ]
                    : [],
            module: {
                rules: [
                    {
                        test: /\.(mp3|ogg|wav)$/i,
                        type: 'asset/resource',
                    },
                ],
            },
        },
    },
    plugins: [
        {
            plugin: require('craco-cesium')(),
            scripts: ['./public/jswebRtc.js'],
        },
    ],
};
