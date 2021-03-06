module.exports = {
    entry: './app-client.js',
    output: {
        filename: 'public/js/bundle.js'
    },
    module: {
        loaders: [
            {
                exclude: /(node-modules|index.js|libs)/,
                loader: 'babel-loader',
                query: {
                    compact: false,
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
};