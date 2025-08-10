const path = require('path');

module.exports = {
    context: __dirname,
    entry: {
        index: './src/index.ts'  // Your entry point (update if needed)
    },
    output: {
        filename: 'main.js',  // Output file name
        path: path.resolve(__dirname, '../public/static/js')  // Output directory
    },
    mode: 'production',  // Change to 'development' for easier debugging
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,  // Apply ts-loader to .ts and .tsx files
                loader: 'ts-loader',
                exclude: /node_modules|\.d\.ts$/,
            },
            {
                test: /\.d\.ts$/,
                loader: 'ignore-loader',  // Ignore .d.ts files
            },
            {
                test: /\.css$/i,                        // ✅ CSS support
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[hash][ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.d.ts']
    }
};
