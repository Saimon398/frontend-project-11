import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    mode: process.env.NODE_ENV || 'development',
    entry: '/src/index.js',
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      open: true,  
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html', 
        }),
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
}