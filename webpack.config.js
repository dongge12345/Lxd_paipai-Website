const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry:'@/src/main.js',
    output:{
        path:path.join(__dirname,'/dist'),
        clean:true
    },
    module:{
        rules:[
            {
                test:/\.(png|jpe?g|git|webp)$/,
                type:"asset",
                parse:{
                    dataUrlCondition:{
                        maxSize:10 * 1024
                    }
                },
                filename:"dist/img/[hash:8][ext][quert]"
            }
        ]
    },
    mode:'production'
}